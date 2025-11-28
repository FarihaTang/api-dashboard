import type { User } from '../types/User';

export interface GetUsersParams {
  page: number;
  pageSize: number;
  keyword: string;
  status?: string;
}

export interface GetUsersResponse {
  users: User[];
  total: number;
  totalPages: number;
}
