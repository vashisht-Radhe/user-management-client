import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <main className="h-[calc(100vh-6rem)]">
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
