import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">120</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Active Users</p>
          <p className="text-2xl font-bold text-green-600">102</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Deactivated</p>
          <p className="text-2xl font-bold text-red-600">18</p>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white shadow rounded p-4 space-y-3">
        <h2 className="font-medium">Quick Actions</h2>

        <button
          onClick={() => navigate("/admin/users")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Manage Users
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
