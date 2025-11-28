import { useState } from "react"

type UserFormValues = {
  firstName: string
  lastName: string
  email: string
  age: number
}
type UserFormProps = {
  initialValues?: UserFormValues
  onSubmit: (values: UserFormValues) => void
  submitting: boolean
  submitLabel: string
}
const defaultValues: UserFormValues = {
  firstName: "",
  lastName: '',
  email: '',
  age: 25
}
function UserForm({ initialValues, onSubmit, submitting = false, submitLabel = "Save" }: UserFormProps) {
  const [values, setValues] = useState<UserFormValues>(initialValues ?? defaultValues)
  // higher oreder function here
  const handleChange = (field: keyof UserFormValues) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = field === "age" ? Number(e.target.value) : e.target.value
      setValues(prev => ({ ...prev, [field]: value }))
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(values)
  }
  return <form onSubmit={handleSubmit} className="space-y-3">
    <div>
      <label className="block text-sm font-medium mb-1">First Name</label>
      <input className="border rounded px-3 py-2 w-full" value={values.firstName} onChange={handleChange('firstName')} required></input>
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Last Name</label>
      <input className="border rounded px-3 py-2 w-full" value={values.lastName} onChange={handleChange('lastName')} required></input>
    </div>
    <div><label className="block text-sm font-medium mb-1">Email</label>
      <input type='email' className="border rounded px-3 py-2 w-full" value={values.email} onChange={handleChange('email')} required></input></div>
    <div>
      <label className="block text-sm font-medium mb-1">Age</label>
      <input type='number' className="border rounded px-3 py-2 w-full" value={values.age} onChange={handleChange('age')} min={1}></input>
    </div>
    <button disabled={submitting}>{submitting ? "Saving..." : submitLabel}</button>
  </form>
}
export default UserForm