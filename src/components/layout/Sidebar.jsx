import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { name: "Dashboard", to: "/admin/dashboard", end: true },
  { name: "Users", to: "/admin/users" },
  { name: "Activity", to: "/admin/activity" },
  { name: "Logout", action: "logout" },
];

const Sidebar = ({ isOpen, onClose, isMobile }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      {isMobile && (
        <div
          onClick={onClose}
          className={`fixed inset-0 z-40 transition-opacity duration-300
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white z-50
        transform transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 h-16 shadow">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 text-xl transition"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col justify-between h-[calc(100vh-4rem)]">
          <nav className="mt-4 flex flex-col gap-1 px-3">
            {navItems.map((item) =>
              item.action === "logout" ? (
                <button
                  key={item.name}
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 text-gray-700"
                >
                  {item.name}
                </button>
              ) : (
                <NavLink
                  key={item.name}
                  to={item.to}
                  end={item.end}
                  onClick={() => {
                    if (isMobile) onClose();
                  }}
                  className={({ isActive }) =>
                    `w-full text-left px-4 py-2 rounded-lg transition ${isActive ? "bg-blue-500 text-white/90 font-semibold" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}`
                  }
                >
                  {item.name}
                </NavLink>
              ),
            )}
          </nav>

          <footer className="px-4 py-3 border-t text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} Radhe. All rights reserved.
          </footer>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
