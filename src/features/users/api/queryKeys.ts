export const userKeys = {
  all: ['users'] as const,
  list: (params: any) => ['users', 'list', params] as const,
  detail: (id: number) => ['users', 'detail', id] as const,
};
