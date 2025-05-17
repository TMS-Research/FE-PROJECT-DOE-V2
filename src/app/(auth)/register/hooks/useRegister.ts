import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "../lib/validation";

type RegisterSchema = z.infer<typeof registerSchema>;

export function useRegister() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const handleSubmit = async (values: RegisterSchema) => {
    setIsLoading(true);
    console.log("Registering user:", values);

    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error state here
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    handleSubmit,
  };
}
