import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { getAllUsers } from "../../services/admin.service";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    deactivated: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAllUsers();
        const users = res.data.data;

        setStats({
          total: users.length,
          active: users.filter((u) => u.isActive).length,
          deactivated: users.filter((u) => !u.isActive).length,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatBox label="Total Users" value={stats.total} />
        <StatBox label="Active Users" value={stats.active} color="green" />
        <StatBox label="Deactivated" value={stats.deactivated} color="red" />
      </div>

      <div className="card">
        <h2 className="text-body">Quick Actions</h2>

        <div className="container-align-center gap-2">
          <Button onClick={() => navigate("/admin/users")}>Manage Users</Button>

          <Button onClick={() => navigate("/dashboard")}>My Dashboard</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

const StatBox = ({ label, value, color }) => {
  const colorMap = {
    green: "text-green-600",
    red: "text-red-600",
  };

  return (
    <div className="card">
      <p className="text-muted">{label}</p>
      <p className={`heading-2 ${colorMap[color] || ""}`}>{value}</p>
    </div>
  );
};
