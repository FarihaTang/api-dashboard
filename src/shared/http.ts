export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type HttpOptions = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  query?: Record<string, any>;
  body?: any;
  timeout?: number;
};

function buildQueryString(query: Record<string, any>) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });
  return params.toString();
}

function withTimeout(ms: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, ms);
  return { signal: controller.signal, clear: () => clearTimeout(timeoutId) };
}

async function safeParseJSON(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function request<T = any>(url: string, options: HttpOptions = {}): Promise<T> {
  const { method = 'GET', headers = {}, query, body, timeout = 10000 } = options;
  const queryString = query ? `?${buildQueryString(query)}` : '';
  const fullUrl = url + queryString;

  const timeoutCtrl = withTimeout(timeout);

  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };
  const fetchOptions: RequestInit = {
    method,
    headers: finalHeaders,
    signal: timeoutCtrl.signal,
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(fullUrl, fetchOptions);

    timeoutCtrl.clear();
    if (!res.ok) {
      // 统一处理错误
      const errJson = await safeParseJSON(res);
      throw {
        status: res.status,
        message: errJson.message || 'Request Timeout',
        detail: errJson,
      };
    }
    return safeParseJSON(res) as Promise<T>;
  } catch (error: any) {
    timeoutCtrl.clear();
    if (error.name === 'AbortError') {
      throw { status: 408, message: 'Request Timeout' };
    }
    throw error;
  }
}

export const http = {
  get: <T = any>(url: string, options: HttpOptions = {}) =>
    request<T>(url, { ...options, method: 'GET' }),
  post: <T = any>(url: string, options: HttpOptions = {}) =>
    request<T>(url, { ...options, method: 'POST' }),
  put: <T = any>(url: string, options: HttpOptions = {}) =>
    request<T>(url, { ...options, method: 'PUT' }),
  delete: <T = any>(url: string, options: HttpOptions = {}) =>
    request<T>(url, { ...options, method: 'DELETE' }),
};
