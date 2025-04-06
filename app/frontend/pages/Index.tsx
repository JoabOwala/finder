// app/frontend/pages/Index.tsx
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';

const AdminUsersIndex = () => {
    const { users } = (usePage().props as unknown) as { users: Array<{ id: number; email: string; role: string }> };


  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      Inertia.delete(`/admin/users/${id}`);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard: Users</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* You can add a form to add new users if desired */}
    </div>
  );
};

export default AdminUsersIndex;
