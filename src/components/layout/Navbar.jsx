import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ onMenuClick, openSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);

  if (!user) return null;

  const isAdmin = user.role === "admin";

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-full h-16 bg-white shadow px-4 py-2 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {isAdmin && onMenuClick && (
          <button
            onClick={onMenuClick}
            className={`text-3xl font-bold cursor-pointer ${
              openSidebar ? "hidden" : "block"
            }`}
          >
            =
          </button>
        )}

        <h2 className="text-xl font-bold text-gray-800">
          {isAdmin ? "Admin" : "User"}
        </h2>

        {/* Admin quick switch */}
        {isAdmin && !onMenuClick && (
          <button
            onClick={() => navigate("/admin")}
            className="ml-4 px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200"
          >
            Go to Admin
          </button>
        )}
      </div>

      {/* RIGHT */}
      <div className="relative">
        {/* Profile circle */}
        <button
          onClick={() => setOpenProfile((prev) => !prev)}
          className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold"
        >
          {user.name?.charAt(0).toUpperCase()}
        </button>

        {/* Dropdown */}
        {openProfile && (
          <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md border z-50">
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-semibold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
