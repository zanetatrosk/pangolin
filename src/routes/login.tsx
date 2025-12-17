import { LoginForm } from "@/components/login-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: (search.redirect as string) || "/",
    };
  },
});

function LoginPage() {
  // This is a placeholder - implement actual login UI here
  return (
    <div className="mx-auto max-w-md flex flex-col justify-center min-h-screen">
      <LoginForm />
    </div>
  );
}
