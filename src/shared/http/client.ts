import type { ApiError } from './types';

export async function http<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const error: ApiError = {
        status: response.status,
        message: data?.message || data?.error || `Request failed with status ${response.status}`,
        detail: data,
      };
      throw error;
    }
    return data as T;
  } catch (err: any) {
    if (err.status) {
      throw err;
    }

    const error: ApiError = {
      status: 0,
      message: err.message || 'Nerework error',
      detail: err,
    };
    throw error;
  }
}
