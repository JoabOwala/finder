import React from "react";
import { router } from "@inertiajs/react";

interface User {
  id: number;
  email: string;
  username: string;
  role: string;
}

interface Props {
  users: User[];
  auth: {
    user: {
      id: number;
    };
  };
}

const AdminUsersIndex: React.FC<Props> = ({ users, auth }) => {
  const handleDelete = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      router.delete(`/admin/users/${userId}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Manage Users</h1>
      <button
        onClick={() => router.get("/admin/users/new")}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Add New User
      </button>
      <button
        onClick={() => router.get("/")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back
      </button>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Username</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.username}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">
                {user.id !== auth.user.id && ( // Only show delete if not current user
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersIndex;
