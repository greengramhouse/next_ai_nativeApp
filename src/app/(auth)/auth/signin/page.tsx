import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sigin Page",
  description: "Sign in to your account",
  keywords: ["Sign In", "AI Native App"],
};

export default function SigninPage() {
  return <LoginForm/>;
}
