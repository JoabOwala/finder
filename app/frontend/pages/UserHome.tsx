// app/frontend/pages/UserHome.tsx
import { router } from "@inertiajs/react";

interface User {
  id: number;
  email: string;
  username: string;
}

interface UserHomeProps {
  user: User;
  welcome_message: string;
}

const UserHome: React.FC<UserHomeProps> = ({ user, welcome_message }) => {
  const handleLogout = () => {
    router.delete("/logout");
  };

  return (
    <div>
      <h1>Hello, {user.username}! Welcome to the user page.</h1>
      <h2>{welcome_message}</h2>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
        Logout
      </button>
    </div>
  );
};

export default UserHome;

