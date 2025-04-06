// app/frontend/pages/AdminHome.tsx
// import React from "react";
import { router } from "@inertiajs/react";

const AdminHome = () => {
  const handleLogout = () => {
    router.delete("/logout");
  };

  return (
    <div>
      <h1>Hello this is admin page</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
        Logout
      </button>
    </div>
  );
};

export default AdminHome;
