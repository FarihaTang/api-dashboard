npm create vite@latest my-app -- --template react-ts

useQuery：负责“读”，自动缓存、自动触发

useMutation：负责“写”，你调用 mutate，它再通知 React Query “数据变了，记得刷新相关 useQuery”

### 乐观更新

“我先假装请求会成功，先把 UI 改掉，等真正请求结果回来，如果失败，再回滚。”

```typescript
const mutation = useMutation({
  mutationFn: variables => apiCall(variables),
  onMutation: async variables => {
    // 请求发出去之前
  },
  onError: (error, variables, context) => {
    // 请求失败
  },
  onSuccess: (data, variables, conetext) => {
    // 请求成功
  },
  onSettled: (data, error, varibales, context) => {
    // 请求结束（成功或失败都会走这里）
  },
});
```
