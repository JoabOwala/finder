// app/frontend/pages/Admin/Users/Index.tsx
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

  const handleLogout = () => {
    router.delete("/logout");
  };

  return (
    <div className="page-wrapper">
      <style>{`
        .page-wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f9fafb;
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 32px 24px;
          flex: 1;
        }
        header {
          background: linear-gradient(to right, #3b82f6, #6366f1);
          padding: 16px 24px;
          color: white;
        }
        .header-inner {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-title {
          font-size: 24px;
          font-weight: bold;
        }
        .logout-button {
          background-color: white;
          color: #dc2626;
          padding: 8px 16px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: 600;
        }
        .logout-button:hover {
          background-color: #f3f4f6;
        }
        h1 {
          font-size: 28px;
          margin-bottom: 24px;
          color: #1f2937;
        }
        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .add-button {
          background-color: #10b981;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }
        .add-button:hover {
          background-color: #059669;
        }
        .back-button {
          background-color: #2563eb;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }
        .back-button:hover {
          background-color: #1d4ed8;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        th, td {
          border: 1px solid #d1d5db;
          padding: 12px;
          text-align: left;
        }
        th {
          background-color: #f3f4f6;
          font-weight: 600;
        }
        td button {
          background-color: #dc2626;
          color: white;
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        td button:hover {
          background-color: #b91c1c;
        }
        footer {
          background: linear-gradient(to right, #3b82f6, #6366f1);
          color: white;
          text-align: center;
          padding: 16px 24px;
          font-size: 14px;
        }
      `}</style>

      {/* Header */}
      <header>
        <div className="header-inner">
          <div className="header-title">Finder</div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container">
        <h1>Manage Users</h1>
        <div className="table-header">
          <button
            onClick={() => router.get("/admin/users/new")}
            className="add-button"
          >
            Add New User
          </button>
          <button
            onClick={() => router.get("/")}
            className="back-button"
          >
            Back
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  {user.id !== auth.user.id && (
                    <button onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer>
        &copy; {new Date().getFullYear()} Finder. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminUsersIndex;
