import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setOpenSidebar(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex w-full h-screen">
      <Sidebar isOpen={openSidebar} onClose={() => setOpenSidebar(false)} />
      <main
        className={`flex-1 transition-all duration-300
        ${openSidebar ? "ml-64" : "ml-0"}`}
      >
        <Navbar
          openSidebar={openSidebar}
          onMenuClick={() => setOpenSidebar(true)}
        />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
