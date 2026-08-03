import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="measure">
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-[20rem]">
          <h1
            className="text-[1.75rem] font-normal tracking-tight text-[var(--ink)] mb-8 text-center"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Sign in
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
