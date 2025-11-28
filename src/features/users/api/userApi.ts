import { http } from '../../../shared/http';
import type { GetUsersParams } from './types';
type UserQuery = {
  keyword?: string;
  status?: string;
  page?: number;
  pageSize?: number;
};

type CreateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

type UpdateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

const API = 'https://dummyjson.com';

export async function getUsers(params: GetUsersParams) {
  const { page = 1, pageSize = 10, keyword = '' } = params;

  const skip = (page - 1) * pageSize;

  const endpoint = keyword ? `${API}/users/search` : `${API}/users`;
  const data = await http.get(endpoint, {
    query: keyword ? { q: keyword, limit: pageSize, skip } : { limit: pageSize, skip },
  });

  return {
    items: data.users,
    total: data.total,
    totalPages: Math.ceil(data.total / pageSize),
  };
}

// delete
export async function deleteUser(id: number) {
  return http.delete(`${API}/users/${id}`);
}
// add
export async function createUser(payload: CreateUserInput) {
  return http.post(`${API}/users/add`, payload);
}
// update
export async function updateUser(id: number, payload: UpdateUserInput) {
  return http.put(`${API}/users/${id}`, payload);
}
