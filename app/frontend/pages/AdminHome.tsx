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

const AdminHome: React.FC<AdminHomeProps> = ({ user, welcome_message }) => {
  const handleLogout = () => {
    router.delete("/logout");
  };

  return (
    <div>
      <h1>Hello, this is the admin page</h1>
      <h1>{welcome_message}</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
        Logout
      </button>
    </div>
  );
};

export default AdminHome;

