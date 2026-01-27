import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Welcome, {user.firstName} 👋</h1>

      <div className="bg-white shadow rounded p-4">
        <p>Email: {user?.email || "radhevashisht@gmail.com"}</p>
        <p>Role: {user?.role || "User"}</p>
        <p>Status: Active</p>
      </div>
    </div>
  );
};

export default UserDashboard;
