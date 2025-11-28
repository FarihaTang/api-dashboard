import UserForm from './UserForm'
import LoadingOverlay from '../../../shared/components/LoadingOverlay'
type AddUserModalProps = {
  open: boolean
  onClose: () => void
  onSubmit: (values: {
    firstName: string
    lastName: string
    email: string
    age: number
  }) => void
  submitting?: boolean
}
function AddUserModal({ open, onClose, onSubmit, submitting = false }: AddUserModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add User</h2>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>
        <LoadingOverlay show={submitting}></LoadingOverlay>
        <UserForm onSubmit={onSubmit} submitting={submitting} submitLabel="Create" />
      </div>
    </div>

  )
}
export default AddUserModal