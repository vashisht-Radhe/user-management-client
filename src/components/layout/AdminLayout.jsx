import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminLayout = () => {
  const isDesktop = window.innerWidth > 768;

  const [isMobile, setIsMobile] = useState(!isDesktop);
  const [openSidebar, setOpenSidebar] = useState(isDesktop);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth > 768;

      setIsMobile(!desktop);

      setOpenSidebar(desktop);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex w-full h-screen">
      <Sidebar
        isMobile={isMobile}
        isOpen={openSidebar}
        onClose={() => setOpenSidebar(false)}
      />
      <main
        className={`flex-1 transition-all duration-300
          ${openSidebar && !isMobile ? "ml-64" : "ml-0"}
        `}
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
