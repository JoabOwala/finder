// app/frontend/Layouts/AuthLayout.tsx
import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const handleLogout = () => {
    Inertia.post("/logout"); // Or use Inertia.visit with method delete, based on your devise config.
  };

  return (
    <div>
      <header>
        <nav>
          <InertiaLink href="/index">Home</InertiaLink>{" "}
          <button onClick={handleLogout}>Logout</button>
          {/* If admin, also show admin link */}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
