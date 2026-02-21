import { useState } from "react";
import { Input, Button } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useAuthForm } from "../../hooks/useAuthForm";
import { loginSchema } from "../../schemas/auth.schema";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import usePageTitle from "../../utilis/usePageTitle";

const loginImage = "/login.webp";

const Login = () => {
  usePageTitle("Login | User Management");
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
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

    const redirectPath =
      loggedInUser.role === "admin" ? "/admin/dashboard" : "/dashboard";

    navigate(redirectPath, { replace: true });
  };

  return (
    <div className="auth-layout">
      <div className="hidden md:block">
        <img
          src={loginImage}
          loading="lazy"
          alt="Login illustratione"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back 👋</h1>
        <p className="auth-subtitle">Please login to your account</p>

        <form
          className="mt-6 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {errors.root?.message && (
            <div className="alert alert-error">{errors.root.message}</div>
          )}

          <Input
            {...register("email")}
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            isRequired
            autoComplete="email"
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
              autoComplete="current-password"
            />

            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-9 auth-link"
              aria-label="Toggle password visibility"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="text-right">
            <Link to="/forgot-password" className="auth-link">
              Forgot password?
            </Link>
          </div>

          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or</span>
            <div className="auth-divider-line" />
          </div>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="auth-link">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
