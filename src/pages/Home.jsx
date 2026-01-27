import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Welcome */}
      <div className="bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user.name} 👋
        </h1>
        <p className="text-gray-600 mt-1">Here's your account overview</p>
      </div>

      {/* User Details */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-lg font-semibold mb-4">Your Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <Detail label="Name" value={user.name} />
          <Detail label="Email" value={user.email} />
          <Detail label="Role" value={user.role} badge />
          <Detail
            label="Status"
            value={user.isActive ? "Active" : "Inactive"}
            status={user.isActive}
          />
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value, badge, status }) => {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      {badge ? (
        <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
          {value}
        </span>
      ) : status !== undefined ? (
        <span
          className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium
            ${
              status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
        >
          {value}
        </span>
      ) : (
        <p className="mt-1 font-medium text-gray-800">{value}</p>
      )}
    </div>
  );
};

export default Home;
