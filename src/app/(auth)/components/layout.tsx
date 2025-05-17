import { DotPattern } from "@/components/magicui/dot-pattern";
import { type PropsWithChildren } from "react";

export interface AuthLayoutProps extends PropsWithChildren {
  title: string;
  description: string;
};

export default function AuthLayout({
  children,
  title,
  description,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-blue-800">
      <DotPattern color="text-blue-600" />
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
          <p className="text-blue-200">{description}</p>
        </div>

        {children}
      </div>
    </div>
  );
}
