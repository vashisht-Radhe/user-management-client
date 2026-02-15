import { useState } from "react";
import { Input, Button } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useAuthForm } from "../../hooks/useAuthForm";
import { registerSchema } from "../../schemas/auth.schema";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const loginImage = "/login.webp";

const Register = () => {
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
      navigate("/dashboard");
    }

    reset();
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="hidden md:block">
        <img src={loginImage} alt="" />
      </div>
      <div className="w-full max-w-md bg-white shadow-md p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Create Account 🚀
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Sign up to get started
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex items-center gap-2">
            <Input
              {...register("firstName")}
              label="First Name"
              placeholder="john"
              error={errors.firstName?.message}
              required
            />

            <Input
              {...register("lastName")}
              label="Last Name"
              placeholder="Doe"
              error={errors.lastName?.message}
            />
          </div>

          <Input
            {...register("email")}
            label="Email"
            type="email"
            placeholder="john@example.com"
            error={errors.email?.message}
            required
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
            />

            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-9 text-sm text-blue-600 hover:underline"
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
          />

          <Button
            disabled={!isValid || isSubmitting}
            type="submit"
            className="w-full"
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </Button>

          <div className="flex items-center gap-4">
            <div className="h-px w-full bg-gray-200" />
            <span className="text-sm text-gray-400">or</span>
            <div className="h-px w-full bg-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
