import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  console.log("user", user);

  if (!user) return null;

  return (
    <div className="w-full mx-auto space-y-6">
      <div className="card shadow-none border-b border-gray-200">
        <h1 className="heading-2">Welcome, {user.firstName} 👋</h1>
        <p className="text-body">Here's your account overview</p>

        {!user.isVerified && (
          <div className="mt-4 flex items-center justify-between gap-4 rounded-lg border border-yellow-300 bg-yellow-50 p-4">
            <div>
              <p className="font-medium text-yellow-800">
                Your email is not verified
              </p>
              <p className="text-sm text-yellow-700">
                Verify your email to secure your account and unlock all
                features.
              </p>
            </div>

            <Link
              to="/verify-otp"
              className="whitespace-nowrap rounded-md bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700"
            >
              Verify Now
            </Link>
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="heading-2 mb-4">Your Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <Detail label="Name" value={user.firstName} />
          <Detail label="Email" value={user.email} />
          <Detail label="Role" value={user.role} badge />
          <Detail
            label="Status"
            value={user.isActive ? "Active" : "Inactive"}
            status={user.isActive}
          />

          <Detail
            label="Email Verified"
            value={user.isVerified ? "Verified" : "Not Verified"}
            status={user.isVerified}
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
          className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
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

export default Dashboard;
