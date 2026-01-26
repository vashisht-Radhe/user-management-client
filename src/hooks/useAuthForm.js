import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useAuthForm = (schema, options = {}) => {
  return useForm({
    resolver: zodResolver(schema),
    ...options,
  });
};
    