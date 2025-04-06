// app/frontend/pages/UserHome.tsx
import { router } from "@inertiajs/react";

const UserHome = () => {

  const handleLogout = () => {
    router.delete("/logout");
    
  };

  return (
    <div>
      <h1>Hello this is the user</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
        Logout
      </button>
    </div>
  );
};

export default UserHome;
