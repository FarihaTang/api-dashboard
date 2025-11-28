import React from "react";
import { UserRow } from "./UserRow";
import type { User } from "../types/User";

type Props = {
  users: User[];
  onDelete?: (id: number) => void;
  onEdit?: (user: User) => void
};

export const UserTable = React.memo(function UserTable({
  users,
  onDelete,
  onEdit
}: Props) {
  return (
    <div className="border rounded">
      <table className="min-w-full text-left">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">UserName</th>
            <th className="p-3">Age</th>
            {onDelete && <th className="p-3">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <UserRow key={u.id} user={u} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
});
