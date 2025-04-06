// import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

const Home = () => {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>
        <InertiaLink href="/login">Login</InertiaLink> or{" "}
        <InertiaLink href="/signup">Signup</InertiaLink>
      </p>
    </div>
  );
};

export default Home;
