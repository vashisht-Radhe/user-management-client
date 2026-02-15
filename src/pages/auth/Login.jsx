import { useState } from "react";
import { Input, Button } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useAuthForm } from "../../hooks/useAuthForm";
import { loginSchema } from "../../schemas/auth.schema";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const loginImage = "/login.webp";

const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useAuthForm(loginSchema, {
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const result = await login(data);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    const loggedInUser = result.user;

    toast.success("Logged in successfully");

    if (loggedInUser.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="hidden md:block">
        <img src={loginImage} alt="" />
      </div>
      <div className="w-full max-w-md bg-white md:bg-transparent shadow-md md:shadow-none p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Please login to your account
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {errors.root?.message && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {errors.root.message}
            </div>
          )}

          <Input
            {...register("email")}
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            isRequired
          />

          <div className="relative">
            <Input
              {...register("password")}
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              error={errors.password?.message}
              className="pr-16"
              isRequired
            />

            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-9 text-sm text-blue-600 hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          <div className="flex items-center gap-4">
            <div className="h-px w-full bg-gray-200" />
            <span className="text-sm text-gray-400">or</span>
            <div className="h-px w-full bg-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
