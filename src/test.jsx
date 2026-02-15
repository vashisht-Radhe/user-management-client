import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "./components";
import axios from "axios";
import Timer from "./utilis/Timer";

/* -------------------- */
/* Zod Schema */
/* -------------------- */
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  firstName: z.string().min(3, "firstname is required"),
  lastName: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const Test = () => {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);

  // 🔹 added states
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState("user");

  const [userId, setUserId] = useState("");
  const [userDetail, setUserDetail] = useState("");

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { isSubmitting: isLoginSubmitting, errors: loginErrors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { isSubmitting: isRegisterSubmitting, errors: registerErrors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const onSubmitRegister = async (data) => {
    try {
      const { firstName, lastName, email, password } = data;

      const response = await axios.post(
        "http://localhost:5500/api/v1/auth/register",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true },
      );

      console.log(response.data.message);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;

      const response = await axios.post(
        "http://localhost:5500/api/v1/auth/login",
        {
          email,
          password,
          message: "Message from Frontend",
        },
        {
          withCredentials: true,
        },
      );

      const userData = response.data.data;
      console.log(userData);

      setUser(userData);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/v1/user/me", {
        withCredentials: true,
      });
      setProfile(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error(
        "Fetch profile error:",
        error.response?.data || error.message,
      );
    }
  };

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    const response = await axios.patch(
      "http://localhost:5500/api/v1/user/me/avatar",
      formData,
      {
        withCredentials: true,
      },
    );

    console.log(response.data);
  };

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const deactivate = async () => {
    const response = await axios.patch(
      "http://localhost:5500/api/v1/user/me/deactivate",
      {},
      { withCredentials: true },
    );
    console.log(response.data.message);
  };

  const isAdmin = user?.role === "admin";

  const getAllUsers = async function () {
    const response = await axios.get(
      "http://localhost:5500/api/v1/admin/users",
      {
        withCredentials: true,
      },
    );
    const usersData = response.data.data;
    setUsers(usersData);
    console.log(usersData.map((u) => u._id));
  };

  const getUserById = async function () {
    if (!userId) return;

    const response = await axios.get(
      `http://localhost:5500/api/v1/admin/users/${userId}`,
      { withCredentials: true },
    );

    const userData = response.data.data;

    setUserDetail(userData);
  };

  const updateUser = async function () {
    if (!selectedUserId) return;

    const response = await axios.patch(
      `http://localhost:5500/api/v1/admin/users/${selectedUserId}/role`,
      { role: selectedRole },
      {
        withCredentials: true,
      },
    );

    console.log(response.data.message);
  };

  const [du, setDu] = useState("");

  const deactivateUser = async function () {
    if (!du) return;

    const response = await axios.patch(
      `http://localhost:5500/api/v1/admin/users/${du}/deactivate`,
      {},
      {
        withCredentials: true,
      },
    );

    console.log(response.data.message);
  };

  const [au, setAu] = useState("");
  const activateUser = async function () {
    try {
      if (!au) return;

      const response = await axios.patch(
        `http://localhost:5500/api/v1/admin/users/${au}/activate`,
        {},
        {
          withCredentials: true,
        },
      );

      console.log(response.data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changePassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        "http://localhost:5500/api/v1/user/me/change-password",
        formData,
        { withCredentials: true },
      );

      console.log(res.data.message);
      alert("Password changed successfully");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const [otp, setOTP] = useState("");
  const verifyOTP = async function (e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5500/api/v1/auth/verify-otp",
        { otp },
        { withCredentials: true },
      );

      console.log(response.data.message);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const [isTimerActive, setIsTimerActive] = useState(true);

  const handleResendOtp = () => {
    // resend OTP logic here
    setIsTimerActive(true);
  };

  return (
    <>
      <form
        className="my-10 mx-auto w-full max-w-xs space-y-2"
        onSubmit={handleRegisterSubmit(onSubmitRegister)}
      >
        <Input
          {...registerRegister("firstName")}
          label="first Name"
          placeholder="Enter your first name"
          isRequired
          error={registerErrors.firstName?.message}
        />
        <Input
          {...registerRegister("lastName")}
          label="last Name"
          placeholder="Enter your last name"
          error={registerErrors.lastName?.message}
        />
        <Input
          {...registerRegister("email")}
          type="email"
          label="Email"
          placeholder="Enter your email"
          isRequired
          error={registerErrors.email?.message}
        />

        <Input
          {...registerRegister("password")}
          type="password"
          label="Password"
          placeholder="Enter your password"
          isRequired
          error={registerErrors.password?.message}
        />

        <Button
          className="mt-5 w-full"
          disabled={isRegisterSubmitting}
          type="submit"
        >
          {isRegisterSubmitting ? "Singing..." : "Sign up"}
        </Button>
      </form>
      <br />
      <form
        className="my-10 mx-auto w-full max-w-xs"
        onSubmit={handleLoginSubmit(onSubmit)}
      >
        <Input
          {...loginRegister("email")}
          type="email"
          label="Email"
          placeholder="Enter your email"
          isRequired
          error={loginErrors.email?.message}
        />

        <Input
          {...loginRegister("password")}
          type="password"
          label="Password"
          placeholder="Enter your password"
          isRequired
          error={loginErrors.password?.message}
        />

        <Button
          className="mt-5 w-full"
          disabled={isLoginSubmitting}
          type="submit"
        >
          {isLoginSubmitting ? "Logging..." : "Login"}
        </Button>
      </form>
      <br />
      {user && (
        <>
          {isAdmin ? (
            <>
              <p>This is admin dashboard</p>

              <Button variant="outline" onClick={getAllUsers}>
                Get All Users
              </Button>

              <div>
                <label htmlFor="role">Update user role</label>
                <br />

                <div className="flex items-center gap-10">
                  <label htmlFor="users">Select User to update</label>

                  <select
                    name="users"
                    id="users"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                  >
                    <option value="">Select user</option>
                    {users.map((u, index) => (
                      <option key={index} value={u._id}>
                        {u.email}
                      </option>
                    ))}
                  </select>

                  <select
                    name="role"
                    id="role"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <Button
                  onClick={updateUser}
                  className="mt-5"
                  variant="secondary"
                >
                  Update User Role
                </Button>
              </div>

              <br />

              <div>
                <label htmlFor="role">Deactivate user</label>
                <br />

                <div className="flex items-center gap-10">
                  <label htmlFor="users">Select User to deactivate</label>

                  <select
                    name="users"
                    id="users"
                    value={du}
                    onChange={(e) => setDu(e.target.value)}
                  >
                    <option value="">Select user</option>
                    {users.map((u, index) => (
                      <option key={index} value={u._id}>
                        {u.email}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  onClick={deactivateUser}
                  className="mt-5"
                  variant="secondary"
                >
                  Deactivate User
                </Button>
              </div>

              <br />

              <div>
                <div className="flex items-center gap-10">
                  <label htmlFor="auser">Select User to activate</label>

                  <select
                    name="users"
                    id="ausers"
                    value={au}
                    onChange={(e) => setAu(e.target.value)}
                  >
                    <option value="">Select user</option>
                    {users.map((u, index) => (
                      <option key={index} value={u._id}>
                        {u.email}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  onClick={activateUser}
                  className="mt-5"
                  variant="secondary"
                >
                  Activate User
                </Button>
              </div>

              <br />

              <div>
                <label htmlFor="user">Get User Detail</label>
                <br />

                <div className="flex flex-col items-center gap-10">
                  <label htmlFor="users">Select User to show details</label>
                  <select
                    name="users"
                    id="users"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  >
                    <option value="">Select user</option>
                    {users.map((u, index) => (
                      <option key={index} value={u._id}>
                        {u.email}
                      </option>
                    ))}
                  </select>{" "}
                  <br />
                  {userDetail && (
                    <div>
                      <p>{userDetail.firstName}</p>
                      <p>{userDetail.lastName}</p>
                      <p>{userDetail.email}</p>
                      <p>{userDetail?.role}</p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={getUserById}
                  className="mt-5"
                  variant="secondary"
                >
                  User Detail
                </Button>
              </div>
            </>
          ) : (
            <p>This is user dashboard</p>
          )}

          <div>
            <Button className="mt-15" onClick={getData}>
              Get Data
            </Button>
          </div>

          {profile && (
            <div>
              <p>{profile.firstName}</p>
              <p>{profile.lastName}</p>
              <p>{profile.email}</p>
              <p>{profile?.role}</p>
              {profile?.avatar && (
                <img
                  src={`http://localhost:5500${profile.avatar}`}
                  alt={profile.firstName}
                  className="w-32 h-32 rounded-full object-cover border"
                />
              )}
            </div>
          )}

          <Button onClick={deactivate} className="my-5">
            Deactivate ur account
          </Button>

          <div className="w-full mt-5 flex items-center justify-center gap-5">
            <label
              htmlFor="avatar"
              className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold cursor-pointer"
            >
              Upload
            </label>

            <Input
              type="file"
              name="avatar"
              id="avatar"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 rounded-full object-cover border"
            />
          )}

          <br />

          <div className="my-10 mx-auto w-full max-w-xs">
            <form className="space-y-5" onSubmit={changePassword}>
              <Input
                placeholder="Current Password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
              />

              <Input
                placeholder="New Password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="w-full rounded bg-black py-2 text-white"
              >
                Change Password
              </button>
            </form>
          </div>

          <br />

          <Button onClick={() => setIsOpen(true)}>Verify OTP</Button>

          {isOpen && (
            <div className="py-5 mx-auto w-full max-w-xl bg-white shadow-md rounded flex flex-col items-center justify-center">
              <div className="m-5">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  verify otp
                </h2>
                <form className="flex items-center gap-5" onSubmit={verifyOTP}>
                  <Input
                    placeholder="Enter otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                  />
                  <Button type="submit">Verify OTP</Button>
                </form>
                <div className="flex items-center gap-3 text-sm">
                  <p className="text-gray-600">Didn’t receive the code?</p>

                  <button
                    className={`font-medium underline transition ${isTimerActive ? "text-gray-400 cursor-not-allowed no-underline" : "text-blue-500 hover:text-blue-600"}`}
                    disabled={isTimerActive}
                    onClick={handleResendOtp}
                  >
                    {isTimerActive ? (
                      <span className="flex items-center gap-1">
                        Resend in <Timer />
                      </span>
                    ) : (
                      "Resend OTP"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}{" "}
    </>
  );
};

export default Test;
