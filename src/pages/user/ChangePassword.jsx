import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "../../components";
import toast from "react-hot-toast";
import { changePassword } from "../../services/user.service";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

const ChangePassword = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const isAdmin = user?.role === "admin";

  const onSubmit = async (formData) => {
    try {
      await changePassword(formData);
      toast.success("Password changed successfully");

      isAdmin ? navigate("/admin/dashboard") : navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register("currentPassword")}
        label="Current Password"
        type="password"
        placeholder="Enter your current password"
        error={errors.currentPassword?.message}
        isRequired
      />

      <Input
        {...register("newPassword")}
        label="New Password"
        type="password"
        placeholder="Enter your new password"
        error={errors.newPassword?.message}
        isRequired
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Changing..." : "Change Password"}
      </Button>
    </form>
  );
};

export default ChangePassword;
