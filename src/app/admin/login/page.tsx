import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login — Ben Schippers",
};

export default function LoginPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-[22rem]">
        <h1
          className="text-2xl text-[var(--fg)] mb-8 text-center"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Admin
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
