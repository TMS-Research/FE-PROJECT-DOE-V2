"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "../lib/validation";
import axiosInstance from "@/api/axios";

type LoginFormValues = z.infer<typeof loginSchema>;

export function useLogin() {
  const router = useRouter();

  const { isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginFormValues) => {
      console.log("Logging in with data:", data);
      await axiosInstance.post("/auth/login", data);
    }
  })

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginFormValues) => {
    console.log("Logging in with data:", data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push("/dashboard");
  };

  return {
    form,
    handleSubmit,
    isLoading: isPending,
  };
}
