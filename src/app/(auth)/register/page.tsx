import { Metadata } from "next";
import AuthLayout from "../components/layout";
import RegisterForm from "./components/register-form";

export const metadata: Metadata = {
  title: "Register | Project Doe",
  description: "Create a new account",
}

export default function RegisterPage() {
  return (
    <AuthLayout title="Register" description="Create a new account">
      <RegisterForm />
    </AuthLayout>
  );
}
