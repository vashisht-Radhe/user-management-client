import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  updateProfilePic,
  deactivateAccount,
  deleteAccount,
} from "../../services/user.service";
import { Button, Input } from "../../components";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";


const PencilIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z"
    />
  </svg>
);

const DefaultAvatar = () => (
  <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center">
    <span className="text-indigo-600 text-3xl font-bold">U</span>
  </div>
);


const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [password, setPassword] = useState("");

  const [deactivateOpen, setDeactivateOpen] = useState(false);


  useEffect(() => {
    (async () => {
      try {
        const { data } = await getProfile();
        setUser(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setAvatarPreview(data.avatar || null);
      } catch {
        toast.error("Failed to load profile");
      }
    })();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const handleSave = async () => {
    try {
      setLoading(true);
      const { data } = await updateProfile({ firstName, lastName });
      setUser(data);
      setEditing(false);
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      setAvatarPreview(URL.createObjectURL(file));
      const { data } = await updateProfilePic(file);
      setUser(data);
      setAvatarPreview(data.avatar);
      toast.success("Avatar updated");
    } catch {
      toast.error("Failed to update avatar");
      setAvatarPreview(user.avatar);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async () => {
    try {
      await deactivateAccount();
      toast.success("Account deactivated");
      navigate("/", { replace: true });
    } catch {
      toast.error("Failed to deactivate account");
    }
  };

  const handleDelete = async () => {
    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);
      await deleteAccount({ password });
      toast.success("Account permanently deleted");
      navigate("/login", { replace: true });
    } catch {
      toast.error("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-lg space-y-8">
        <div className="bg-white rounded-3xl shadow p-8 text-center">
          <div className="relative mx-auto w-fit">
            {avatarPreview ? (
              <img
                src={`http://localhost:5500${avatarPreview}`}
                alt="avatar"
                className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500"
              />
            ) : (
              <DefaultAvatar />
            )}

            <label className="absolute bottom-1 right-1 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition">
              <PencilIcon />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          {!editing ? (
            <div className="mt-4 flex justify-center items-center gap-2">
              <h2 className="text-2xl font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <button
                onClick={() => setEditing(true)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                <PencilIcon />
              </button>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
              />

              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={loading}>
                  Save
                </Button>
                <Button variant="secondary" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <p className="text-sm text-gray-500 mt-2">{user.email}</p>

          <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
            {user.role}
          </span>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Security</h3>

          <Link
            to="/change-password"
            className="text-indigo-600 hover:underline text-sm"
          >
            Change password
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Account status
          </h3>

          <Button
            className="w-full bg-amber-100 text-amber-700 hover:bg-amber-200"
            onClick={() => setDeactivateOpen(true)}
          >
            Deactivate account (you can reactivate later)
          </Button>
        </div>

        {deactivateOpen && (
          <div
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
            onClick={() => setDeactivateOpen(false)}
          >
            <div
              className="bg-white rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-semibold text-gray-900">
                ⚠️ Deactivate account
              </h2>

              <p className="text-sm text-gray-600 mt-2">
                Your account will be temporarily disabled. You won’t be able to
                log in until you reactivate it. Your data will remain safe.
              </p>

              <ul className="mt-3 text-sm text-gray-600 list-disc list-inside">
                <li>You can reactivate anytime by logging in</li>
                <li>Your data will not be deleted</li>
                <li>No emails or notifications will be sent</li>
              </ul>

              <div className="flex gap-3 mt-6">
                <Button
                  className="bg-amber-500 text-white hover:bg-amber-600"
                  disabled={loading}
                  onClick={async () => {
                    setDeactivateOpen(false);
                    await handleDeactivate();
                  }}
                >
                  {loading ? "Deactivating..." : "Deactivate account"}
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => setDeactivateOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow p-6 border border-red-100">
          <h3 className="text-sm font-semibold text-red-600 mb-3">
            Permanent actions
          </h3>

          <Button
            className="w-full bg-red-600 text-white hover:bg-red-700"
            onClick={() => setDeleteOpen(true)}
          >
            Permanently delete account
          </Button>
        </div>
      </div>

      {deleteOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setDeleteOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-gray-900">
              ⚠️ Permanently delete account
            </h2>

            <p className="text-sm text-gray-600 mt-2">
              This action cannot be undone. All your data will be permanently
              removed.
            </p>

            <div className="mt-4">
              <Input
                label="Confirm password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                disabled={!password || loading}
                onClick={handleDelete}
              >
                Delete permanently
              </Button>

              <Button variant="secondary" onClick={() => setDeleteOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
