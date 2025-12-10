import { HeadContent, Scripts, createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/auth";
import appCss from "../styles.css?url";

import "@/lib/i18n"; 

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

function RootComponent() {
  const router = useRouterState();
  const isLoginPage = router.location.pathname === '/login';
  
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          {!isLoginPage && <Header />}
          <div className="grow">
            <Outlet />
          </div>
          {!isLoginPage && <Footer />}
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
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}