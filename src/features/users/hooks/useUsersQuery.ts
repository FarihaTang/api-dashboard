import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { GetUsersParams, GetUsersResponse } from '../api/types';
import { userKeys } from '../api/queryKeys';
import { getUsers } from '../api/userApi';

export default function useUsersQuery(params: GetUsersParams) {
  return useQuery<GetUsersResponse, Error>({
    queryKey: userKeys.list(params),
    queryFn: () => getUsers(params),
    placeholderData: keepPreviousData,
  });
}
