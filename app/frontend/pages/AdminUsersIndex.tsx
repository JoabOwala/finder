// import React from "react";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

interface AdminUsersPageProps {
  users: Array<{ id: number; email: string; role: string }>;
}

const AdminUsersIndex = () => {
  const { users } = (usePage().props as unknown) as AdminUsersPageProps;

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      Inertia.delete(`/admin/users/${id}`);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard: Users</h1>
      <InertiaLink href="/admin/users/new">Create New User</InertiaLink>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: { id: number; email: string; role: string }) => (
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
    </div>
  );
};

export default AdminUsersIndex;
