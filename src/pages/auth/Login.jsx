import { useState } from "react";
import { Input, Button } from "../../components";
import { Link } from "react-router-dom";
import { useAuthForm } from "../../hooks/useAuthForm";
import { loginSchema } from "../../schemas/auth.schema";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useAuthForm(loginSchema, { mode: "onChange" });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Login data:", data);
    reset();
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Please login to your account
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email")}
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            required
          />

          <div className="relative">
            <Input
              {...register("password")}
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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
