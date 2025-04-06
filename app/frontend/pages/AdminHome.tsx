// app/frontend/pages/AdminHome.tsx
// import React from "react";
import { router } from "@inertiajs/react";

interface User {
  id: number;
  email: string;
  username: string;
}

interface AdminHomeProps {
  user: User;
  welcome_message: string;
}

const AdminHome: React.FC<AdminHomeProps> = ({ user }) => {
  const handleLogout = () => {
    router.delete("/logout");
  };

  return (
    <div>
      <h1>Hello, {user.username} this is the admin page</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
        Logout
      </button>
    </div>
  );
};

export default AdminHome;

