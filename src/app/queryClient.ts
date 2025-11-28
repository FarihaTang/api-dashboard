import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 查询失败后重试一次
      refetchOnWindowFocus: false, // 不要切回窗口就刷新
      staleTime: 60 * 1000, // 1 分钟内使用缓存
      // onError(error) {
      //   toast.error(error.message || 'Query Error');
      // },
    },
    mutations: {
      onError(error) {
        toast.error(error.message || 'Mutation Error');
      },
    },
  },
});
