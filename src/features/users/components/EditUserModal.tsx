import UserForm from './UserForm'
import type { User } from './UserTable'
import LoadingOverlay from '../../../shared/components/LoadingOverlay';

type EditUserModalProps = {
  open: boolean;
  onClose: () => void;
  user: User | null;    // 要编辑的用户
  onSubmit: (values: {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
  }) => void;
  submitting?: boolean;

}
function EditUserModal({ open,
  onClose,
  user,
  onSubmit,
  submitting = false }: EditUserModalProps) {
  if (!open || !user) return null
  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    age: user.age
  }
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit User</h2>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>
        <LoadingOverlay show={submitting} />
        <UserForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          submitting={submitting}
          submitLabel="Update"
        />
      </div>
    </div>
  );
}
export default EditUserModal