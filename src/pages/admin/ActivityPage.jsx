import { fakeActivities } from "../../data/fakeActivities";

const ActivityPage = () => {
  return (
    <div className="p-8">
      <h1 className="heading-2 mb-4">System Activity</h1>

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
            {fakeActivities.map((log) => (
              <tr key={log.id} className="border-t">
                <Td>{log.actor}</Td>
                <Td>{formatAction(log.action)}</Td>
                <Td>{log.target}</Td>
                <Td>
                  <StatusBadge status={log.status} />
                </Td>
                <Td>{new Date(log.createdAt).toLocaleString()}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityPage;

const Th = ({ children }) => (
  <th className="px-4 py-3 text-sm font-medium text-gray-600">{children}</th>
);

const Td = ({ children }) => (
  <td className="px-4 py-3 text-sm text-gray-800">{children}</td>
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
