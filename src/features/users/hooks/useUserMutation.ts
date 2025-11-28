import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '../api/userApi';
import { queryClient } from '@/app/queryClient';

export default function useUserMutation() {
  const deleteMutation = useMutation({
    mutationFn: deleteUser, // deleteMutation.mutate()执行
    // 🟡 1. 乐观更新
    // 发请求前
    onMutate: async (id: number) => {
      // 把所有读的请求都停掉
      await queryClient.cancelQueries({ queryKey: ['users'] });
      // 当前页面数据对应的query key
      const key = ['users', { keyword, page, pageSize }];
      // 当前数据
      const prevData = queryClient.getQueryData<any>(key);

      // 临时更新 UI（删除该行）
      queryClient.setQueryData(key, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.filter((u: any) => u.id !== id),
        };
      });

      // 收集当前数据，用来回滚
      // 传给onError / onSettled 的第三个参数 context
      return { prevData };
    },
    // 🔴 2. 失败回滚
    onError: (_error, _id, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(['users', { keyword, page, pageSize }], context.prevData);
      }
    },
    // 🟢 3. 请求结束后刷新数据
    onSettled: () => {
      // 让所有 ["users", ...] 相关的 query 再重新请求一次
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
