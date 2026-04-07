import {
  HeadContent,
  Scripts,
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Header } from "@/components/layout/Header";
import appCss from "../styles.css?url";

import "@/lib/i18n";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Connect2Dance - Social Dance Events & Community",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootComponent,
});

const queryClient = new QueryClient();

function RootComponent() {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <head>
          <HeadContent />
        </head>
        <body className="flex flex-col min-h-screen">
          <AuthProvider>
            <Header />
            <div className="grow">
              <Toaster position="top-center" />
              <Outlet />
            </div>
            <Footer />
          </AuthProvider>
          <TanStackDevtools
            config={{
              position: "bottom-right",
            }}
            plugins={[
              {
                name: "Tanstack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
          <Scripts />
        </body>
      </QueryClientProvider>
    </html>
  );
}
