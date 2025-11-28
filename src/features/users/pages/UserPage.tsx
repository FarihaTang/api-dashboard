import { useMutation } from "@tanstack/react-query";
import { deleteUser, createUser, updateUser } from "../api/userApi";
import useUserFilter from "../hooks/useUserFilter";
import SearchInput from "../../../shared/components/SearchInput";
// import { StatusFilter } from "../features/users/components/StatusFilter";
import { Pagination } from "../../../shared/components/Pagination";
import { UserTable } from "../components/UserTable";
import { queryClient } from '../../../app/queryClient'
import { useState } from "react";
import AddUserModal from "../components/AddUserModal";
import type { User } from '../types/User'
import EditUserModal from "../components/EditUserModal";
import SearchSkeleton from "../components/SearchSkeleton";
import TableSkeleton from "../../../shared/components/TableSkeleton";
import EmptyState from "../../../shared/components/EmptyState";
import ErrorState from "../../../shared/components/ErrorState";
import useUsersQuery from "../hooks/useUsersQuery";

function UserPage() {

  const [addOpen, setAddOpen] = useState<boolean>(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const { keyword, page, pageSize, updateParams } = useUserFilter()

  const { data, isLoading, error, refetch } = useUsersQuery({ keyword, page, pageSize })

  const deleteMutation = useMutation({
    mutationFn: deleteUser, // deleteMutation.mutate()执行
    // 🟡 1. 乐观更新
    // 发请求前
    onMutate: async (id: number) => {
      // 把所有读的请求都停掉
      await queryClient.cancelQueries({ queryKey: ["users"] })
      // 当前页面数据对应的query key
      const key = ["users", { keyword, page, pageSize }];
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
        queryClient.setQueryData(
          ["users", { keyword, page, pageSize }],
          context.prevData
        );
      }
    },
    // 🟢 3. 请求结束后刷新数据
    onSettled: () => {
      // 让所有 ["users", ...] 相关的 query 再重新请求一次
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  })

  // ⭐ Add User —— useMutation + 乐观更新
  const addUserMutation = useMutation({
    mutationFn: createUser,
    // 1. 发请求前：乐观插入一条记录
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ['users'] })
      const key = ["users", { keyword, page, pageSize }];
      const prev = queryClient.getQueryData<any>(key)
      queryClient.setQueryData(key, (old: any) => {
        if (!old) return old
        const tempId = Date.now() // 临时 id
        const optimisticUser = { id: tempId, ...newUser }
        return {
          ...old,
          items: [optimisticUser, ...old.items]
        }
      })
      return { prev }
    },
    // 2. 请求失败：回滚
    onError: (_err, _variables, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(
          ["users", { keyword, page, pageSize }],
          ctx.prev
        );
      }
    },
    // 3. 请求结束（成功/失败）：重新拉取最新数据
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  })

  const handleAddUser = (values: {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
  }) => {
    addUserMutation.mutate(values, {
      onSuccess: () => {
        setAddOpen(false)
      }
    })
  }

  // ⭐ Edit User
  const editUserMutation = useMutation({
    mutationFn: ({ id, values }: { id: number, values: any }) => updateUser(id, values),
    // 乐观更新
    onMutate: async ({ id, values }) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const key = ["users", { keyword, page, pageSize }];
      const prev = queryClient.getQueryData<any>(key);

      queryClient.setQueryData(key, (old: any) => {
        if (!old) return old;

        return {
          ...old,
          items: old.items.map((u: any) =>
            u.id === id
              ? { ...u, ...values } // 临时更新 UI
              : u
          ),
        };
      });

      return { prev };
    },

    // 失败 → 回滚
    onError: (_err, _vars, ctx) => {
      const key = ["users", { keyword, page, pageSize }];
      if (ctx?.prev) queryClient.setQueryData(key, ctx.prev);
    },

    // 成功或失败 → 刷新数据
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  })
  const handleEditSubmit = (values: any) => {
    if (!editingUser) return
    editUserMutation.mutate(
      { id: editingUser.id, values },
      {
        onSuccess: () => {
          setEditingUser(null); // 成功后关闭 modal
        },
      }
    );
  }
  // if (true) throw new Error("Test crash");

  if (isLoading) return <div className="p-6 space-y-4">
    <SearchSkeleton></SearchSkeleton>
    <TableSkeleton columns={5} rows={8}></TableSkeleton>
  </div>
  if (error) {
    return (
      <div className="p-6">
        <ErrorState
          message={(error as any)?.message || "Failed to load users"}
          onRetry={() => refetch()}
        />
      </div>
    );
  }
  // 无搜索结果
  if (!isLoading && data?.users.length === 0 && keyword) {
    return (
      <div className="p-6 space-y-4">
        <SearchInput
          value={keyword}
          onChange={(v) => updateParams({ keyword: v, page: "1" })}
          placeholder="Search users…"
        />

        <EmptyState
          title="No matching users"
          description="Try another keyword or clear filters"
          action={
            <button
              onClick={() => updateParams({ keyword: "", page: "1" })}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Clear Search
            </button>
          }
        />
      </div>
    );
  }
  // 完全无数据
  if (!isLoading && data?.users.length === 0 && !keyword) {
    return (
      <div className="p-6 space-y-4">
        <EmptyState
          title="No users yet"
          description="Start by adding your first user"
          action={
            <button
              onClick={() => setAddOpen(true)}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              + Add User
            </button>
          }
        />
      </div>
    );
  }


  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <SearchInput value={keyword} onChange={(v) => updateParams({ keyword: v, page: "1" })}></SearchInput>
        <button onClick={() => setAddOpen(true)}>+ Add User</button>
      </div>
      <UserTable users={data?.users ?? []} onDelete={(id) => deleteMutation.mutate(id)} onEdit={(user) => setEditingUser(user)}></UserTable>
      <Pagination page={page} totalPages={data?.totalPages ?? 1} onChange={(p) => updateParams({ page: String(p) })}></Pagination>
      {/* Add User */}
      <AddUserModal open={addOpen} onClose={() => setAddOpen(false)} onSubmit={handleAddUser} submitting={addUserMutation.isPending}></AddUserModal>
      {/* Edit User */}
      <EditUserModal open={!!editingUser} onClose={() => setEditingUser(null)} user={editingUser} onSubmit={handleEditSubmit} submitting={editUserMutation.isPending}></EditUserModal>
    </div>
  );
}
export default UserPage