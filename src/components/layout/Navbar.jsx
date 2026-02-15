import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ onMenuClick, openSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const dropdownRef = useRef();

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur shadow-md">
      <div className="h-16 px-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {isAdmin && onMenuClick && (
            <button
              onClick={onMenuClick}
              className={`text-2xl font-semibold px-2 rounded hover:bg-gray-100 ${
                openSidebar ? "hidden" : "block"
              }`}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          )}
          <h2
            onClick={() => {
              if (!user) navigate("/");
              else if (isAdmin) navigate("/admin/dashboard");
              else navigate("/dashboard");
            }}
            className="text-xl font-bold text-gray-800 cursor-pointer hover:text-indigo-600 transition"
          >
            Auth
          </h2>

          {isAdmin && !onMenuClick && (
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="ml-3 px-3 py-1.5 text-xs rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
            >
              Admin Panel
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/profile"
                className="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                Profile
              </Link>
              
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setOpenProfile((p) => !p)}
                  className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold shadow hover:shadow-md transition"
                >
                  {user.firstName?.charAt(0).toUpperCase()}
                </button>

                {openProfile && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b bg-gray-50">
                      <p className="text-sm font-medium text-gray-800">
                        {user.firstName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setOpenProfile(false)}
                    >
                      Manage profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition shadow"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
