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
    <div className="container mx-auto max-w-md p-6">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <p className="text-muted-foreground">
        Login page - implement your authentication UI here
      </p>
    </div>
  );
}
