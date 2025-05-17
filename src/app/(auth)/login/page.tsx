import { Metadata } from "next";
import AuthLayout from "../components/layout";
import LoginForm from "./components/login-form";

export const metadata: Metadata = {
  title: "Login | Project Doe",
  description: "Sign in to continue your learning journey",
}

export default function LoginPage() {
  return (
    <AuthLayout
      title="Login"
      description="Sign in to continue your learning journey"
    >
      <LoginForm />
    </AuthLayout>
  );
}
