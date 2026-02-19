import { useEffect, useState } from "react";
import { getActivities } from "../../services/admin.service";

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchActivities = async () => {
      try {
        setLoading(true);

        const res = await getActivities();

        if (!isMounted) return;

        setActivities(res?.data?.activities || []);
        setTotal(res?.data?.total || 0);
      } catch (error) {
        console.error("Failed to fetch activities", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="p-8">
      <h1 className="heading-2 mb-4">System Activity ({total})</h1>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <Th>Actor</Th>
              <Th>Action</Th>
              <Th>Target</Th>
              <Th>Status</Th>
              <Th>Date</Th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <Td colSpan={5}>Loading...</Td>
              </tr>
            ) : activities.length === 0 ? (
              <tr>
                <Td colSpan={5}>No activity found</Td>
              </tr>
            ) : (
              activities.map((log) => (
                <tr key={log._id} className="border-t border-gray-200">
                  <Td>{log.userSnapshot?.email || "N/A"}</Td>

                  <Td>{formatAction(log.action)}</Td>

                  <Td>{log.targetUserSnapshot?.email || "—"}</Td>

                  <Td>
                    <StatusBadge status={log.status || "SUCCESS"} />
                  </Td>

                  <Td>
                    {log.createdAt
                      ? new Date(log.createdAt).toLocaleString()
                      : "—"}
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityPage;

/* ================= helpers ================= */

const Th = ({ children }) => (
  <th className="px-4 py-3 text-sm font-medium text-gray-600">{children}</th>
);

const Td = ({ children, colSpan }) => (
  <td colSpan={colSpan} className="px-4 py-3 text-sm text-gray-800 text-center">
    {children}
  </td>
);

const StatusBadge = ({ status }) => (
  <span
    className={`px-2 py-1 rounded text-xs font-semibold ${
      status === "SUCCESS"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {status}
  </span>
);

const formatAction = (action) => {
  const map = {
    UPDATE_ROLE: "Updated user role",
    DEACTIVATE_USER: "Deactivated user",
    DELETE_USER: "Deleted user",
    USER_REGISTER: "User registered",
  };

  return map[action] || action;
};
