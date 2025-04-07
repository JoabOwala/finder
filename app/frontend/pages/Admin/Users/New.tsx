// app/frontend/pages/Admin/Users/New.tsx
import React, { useState } from "react";
import { router } from "@inertiajs/react";

interface Errors {
  email?: string[];
  password?: string[];
  role?: string[];
  username?: string[];
}

interface Props {
  errors?: Errors;
}

const AdminUsersNew: React.FC<Props> = ({ errors }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    role: "user",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/admin/users", {
      user: formData,
    });
  };

  const handleLogout = () => {
    router.delete("/logout");
  };

  const handleBack = () => {
    router.get("/admin/users");
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
        .top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .top-row h1 {
          font-size: 28px;
          color: #1f2937;
          margin: 0;
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
        form {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          width: 100%;
        }
        form .field {
          margin-bottom: 16px;
        }
        form label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #374151;
        }
        form input,
        form select {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 16px;
        }
        form .error {
          margin-top: 4px;
          color: #dc2626;
          font-size: 14px;
        }
        form button[type="submit"] {
          background-color: #2563eb;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          margin-top: 16px;
          width: 100%;
        }
        form button[type="submit"]:hover {
          background-color: #1d4ed8;
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
        <div className="top-row">
          <h1>Add New User</h1>
          <button onClick={handleBack} className="back-button">
            Back
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Username:</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
            {errors?.username && (
              <div className="error">{errors.username[0]}</div>
            )}
          </div>
          <div className="field">
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            {errors?.email && (
              <div className="error">{errors.email[0]}</div>
            )}
          </div>
          <div className="field">
            <label>Password:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            {errors?.password && (
              <div className="error">{errors.password[0]}</div>
            )}
          </div>
          <div className="field">
            <label>Role:</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors?.role && <div className="error">{errors.role[0]}</div>}
          </div>
          <button type="submit">Create User</button>
        </form>
      </div>

      {/* Footer */}
      <footer>
        &copy; {new Date().getFullYear()} Finder. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminUsersNew;
