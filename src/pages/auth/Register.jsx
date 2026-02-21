import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../components";
import { useAuth } from "../../context/AuthContext";
import { useAuthForm } from "../../hooks/useAuthForm";
import { registerSchema } from "../../schemas/auth.schema";
import usePageTitle from "../../utilis/usePageTitle";

const loginImage = "/login.webp";

const Register = () => {
  usePageTitle("Register | User Management");
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useAuthForm(registerSchema, {
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const res = await registerUser(data);

    if (res?.error) {
      toast.error(res.error);
      return;
    }

    toast.success(res.data.message);

    const registeredUser = res.data?.data;

    if (registeredUser) {
      navigate("/dashboard", { replace: true });
    }

    reset();
  };

  return (
    <div className="auth-layout">
      <div className="hidden md:block">
        <img src={loginImage} loading="lazy" alt="Registration illustration" />
      </div>
      <div className="auth-card mt-5">
        <h1 className="auth-title">Create Account 🚀</h1>
        <p className="auth-subtitle">Sign up to get started</p>

        <form
          className="mt-6 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="md:flex items-center gap-2">
            <Input
              {...register("firstName")}
              label="First Name"
              placeholder="john"
              error={errors.firstName?.message}
              required
              autoComplete="given-name"
            />

            <Input
              {...register("lastName")}
              label="Last Name"
              placeholder="Doe"
              error={errors.lastName?.message}
              autoComplete="family-name"
            />
          </div>

          <Input
            {...register("email")}
            label="Email"
            type="email"
            placeholder="john@example.com"
            error={errors.email?.message}
            required
            autoComplete="email"
          />

          <div className="relative">
            <Input
              {...register("password")}
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              error={errors.password?.message}
              className="pr-16"
              required
              autoComplete="new-password"
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

          <Input
            {...register("confirmPassword")}
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            required
            autoComplete="new-password"
          />

          <Button
            disabled={!isValid || isSubmitting}
            type="submit"
            className="w-full"
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </Button>

          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or</span>
            <div className="auth-divider-line" />
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
