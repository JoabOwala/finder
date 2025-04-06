import React, { useState } from 'react';
import { router } from '@inertiajs/react';

interface Errors {
  email?: string[];
  password?: string[];
  role?: string[];
}

interface Props {
  errors?: Errors;
}

const AdminUsersNew: React.FC<Props> = ({ errors }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/admin/users', {
      user: formData,
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Add New User</h1>
      <button
          onClick={() => router.get('/admin/users')}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back to Users
        </button>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border p-2 w-full"
            required
          />
          {errors?.email && <div className="text-red-500">{errors.email[0]}</div>}
        </div>
        <div>
          <label className="block">Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="border p-2 w-full"
            required
          />
          {errors?.password && <div className="text-red-500">{errors.password[0]}</div>}
        </div>
        <div>
          <label className="block">Role:</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="border p-2 w-full"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors?.role && <div className="text-red-500">{errors.role[0]}</div>}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create User
        </button>
      </form>
    </div>
  );
};

export default AdminUsersNew;