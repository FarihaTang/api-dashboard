import React from "react";
import type { User } from "../types/User";

type Props = {
  user: User;
  onDelete?: (id: number) => void;
  onEdit?: (user: User) => void
};

export const UserRow = React.memo(function UserRow({ user, onDelete, onEdit }: Props) {
  return (
    <tr className="border-b last:border-0">
      <td className="p-3">{user.firstName} {user.lastName}</td>
      <td className="p-3">{user.email}</td>
      <td className="p-3">{user.username}</td>
      <td className="p-3">{user.age}</td>

      {onDelete && (
        <td className="p-3">
          <button
            onClick={() => onDelete(user.id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </td>
      )}
      {onEdit && (
        <button
          onClick={() => onEdit(user)}
          className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
        >
          Edit
        </button>)}
    </tr>
  );
}, areEqual);

// optional: custom compare (更精准避免 re-render)
function areEqual(prev: Props, next: Props) {
  return (
    prev.user.id === next.user.id &&
    prev.user.firstName === next.user.firstName &&
    prev.user.lastName === next.user.lastName &&
    prev.user.email === next.user.email &&
    prev.user.username === next.user.username &&
    prev.onDelete === next.onDelete
  );
}
