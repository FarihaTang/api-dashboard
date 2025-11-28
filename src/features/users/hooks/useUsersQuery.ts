import { useQuery } from '@tanstack/react-query';
import type { GetUsersParams } from '../api/types';
import { userKeys } from '../api/queryKeys';
import { getUsers } from '../api/userApi';

export default function useUsersQuery(params: GetUsersParams) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => getUsers(params),
    keepPreviousData: true,
  });
}
