import { useSearchParams } from 'react-router-dom';

export default function useUserFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams?.get('keyword') ?? '';
  const page = Number(searchParams?.get('page') ?? '1');
  const pageSize = Number(searchParams?.get('pageSize') ?? '10');

  const updateParams = (path: Record<string, string>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(path).forEach(([key, value]) => {
      if (value === '' || value === undefined) next.delete(key);
      next.set(key, value);
    });
    setSearchParams(next);
  };

  return { keyword, page, pageSize, updateParams };
}
