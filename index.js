import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* ================= ZOD SCHEMA ================= */

// const formSchema = z
//   .object({
//     email: z
//       .string()
//       .min(1, "Email is required")
//       .email("Invalid email address"),

//     password: z.string().min(8, "Password must be at least 8 characters"),

//     confirmPassword: z.string().min(1, "Confirm password is required"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"], // 👈 show error under confirmPassword
//   });

const zodResult = {
  success: false,
  error: {
    issues: [
      {
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        path: ["email"],
        message: "Required",
      },
      {
        code: "too_small",
        minimum: 8,
        type: "string",
        inclusive: true,
        exact: false,
        path: ["password"],
        message: "String must contain at least 8 character(s)",
      },
    ],
    name: "ZodError",
  },
};
// console.log("Result: ", zodResult);
/* ================= APP ================= */

export default function App() {
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors, isSubmitting, isValid },
  // } = useForm({
  //   resolver: zodResolver(formSchema), // 🔥 Zod here
  //   mode: "onChange", // 🔥 live validation
  // });

  // const onSubmit = async (data) => {
  //   await new Promise((r) => setTimeout(r, 1500));
  //   console.log("Form data:", data);
  //   reset();
  // };

  // /* 🔹 helper for input styles */
  // const inputClass = (error) =>
  //   `w-full px-4 py-2 rounded border-2 transition
  //    focus:outline-none focus:ring-2
  //    ${
  //      error
  //        ? "bg-red-200 border-red-500 focus:ring-red-400"
  //        : "bg-white border-gray-300 focus:ring-blue-400"
  //    }`;

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-200">
    //   <form
    //     onSubmit={handleSubmit(onSubmit)}
    //     className="w-full max-w-md bg-white p-8 rounded-lg shadow space-y-4"
    //   >
    //     <h2 className="text-2xl font-semibold text-center text-gray-800">
    //       Create Account
    //     </h2>

    //     {/* Email */}
    //     <div>
    //       <input
    //         {...register("email")}
    //         type="email"
    //         placeholder="Email"
    //         className={inputClass(errors.email)}
    //       />
    //       {errors.email && (
    //         <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
    //       )}
    //     </div>

    //     {/* Password */}
    //     <div>
    //       <input
    //         {...register("password")}
    //         type="password"
    //         placeholder="Password"
    //         className={inputClass(errors.password)}
    //       />
    //       {errors.password && (
    //         <p className="text-red-600 text-sm mt-1">
    //           {errors.password.message}
    //         </p>
    //       )}
    //     </div>

    //     {/* Confirm Password */}
    //     <div>
    //       <input
    //         {...register("confirmPassword")}
    //         type="password"
    //         placeholder="Confirm Password"
    //         className={inputClass(errors.confirmPassword)}
    //       />
    //       {errors.confirmPassword && (
    //         <p className="text-red-600 text-sm mt-1">
    //           {errors.confirmPassword.message}
    //         </p>
    //       )}
    //     </div>

    //     {/* Submit */}
    //     <button
    //       type="submit"
    //       disabled={!isValid || isSubmitting}
    //       className="w-full bg-blue-500 text-white py-2 rounded
    //                  disabled:bg-gray-400 disabled:cursor-not-allowed"
    //     >
    //       {isSubmitting ? "Submitting..." : "Submit"}
    //     </button>
    //   </form>
    // </div>
    <div>
      <h4>
        Result <br />
        <span>
          {!zodResult.success &&
            zodResult.error.issues.map((issue, index) => (
              <div key={index}>
                <p>
                  {issue.path[0]}: {issue.message}
                </p>
              </div>
            ))}
        </span>
      </h4>

      <p className="text-red-500">{`Error: ${zodResult.error.issues}`}</p>
    </div>
  );
}
