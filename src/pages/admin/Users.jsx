import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getAllUsers,
  updateUserRole,
  deactivateUser,
  activateUser,
  deleteUser,
} from "../../services/admin.service";
import { Button } from "../../components";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      setUsers(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, role);
      toast.success("User role updated successfully");
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update role");
    }
  };

  const handleToggleActive = async (user) => {
    try {
      if (user.isActive) {
        await deactivateUser(user._id);
        toast.success("User deactivated successfully");
      } else {
        await activateUser(user._id);
        toast.success("User activated successfully");
      }
      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update user status",
      );
    }
  };

  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this user?");
    if (!ok) return;

    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) {
    return <div className="p-8 text-sm text-gray-500">Loading users…</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Users</h1>
        <p className="text-sm text-gray-500 mt-1">
          View and manage registered users
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <Th>Email</Th>
              <Th>Name</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Verified</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user?._id}
                className="border-t border-t-gray-700 hover:bg-gray-50 transition"
              >
                <Td>{user?.email}</Td>

                <Td>
                  <div className="font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </div>
                </Td>

                <Td>
                  <select
                    value={user?.role}
                    onChange={(e) =>
                      handleRoleChange(user?._id, e.target.value)
                    }
                    className="border border-gray-400 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </Td>

                <Td>
                  <StatusBadge active={user?.isActive} />
                </Td>

                <Td>
                  {user.isVerified ? (
                    <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                      ✔ Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-gray-400 text-sm">
                      ✖ Not verified
                    </span>
                  )}
                </Td>

                <Td align="right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleToggleActive(user)}
                    >
                      {user?.isActive ? "Deactivate" : "Activate"}
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user?._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-sm text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

const Th = ({ children, align = "left" }) => {
  const alignClass =
    {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[align] || "text-left";

  return (
    <th
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 ${alignClass}`}
    >
      {children}
    </th>
  );
};

const Td = ({ children, align = "left" }) => {
  const alignClass =
    {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[align] || "text-left";

  return (
    <td className={`px-4 py-3 text-sm text-gray-700 ${alignClass}`}>
      {children}
    </td>
  );
};

const StatusBadge = ({ active }) => (
  <span
    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
      active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
    }`}
  >
    {active ? "Active" : "Inactive"}
  </span>
);
