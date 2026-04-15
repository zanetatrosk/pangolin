import { redirect } from "@tanstack/react-router";
import { authStore, selectIsAuthenticated } from "@/stores/authStore";
import { PATHS } from "@/paths";

/**
 * Authentication guard for protected routes.
 * Redirects to login page if user is not authenticated.
 * 
 * @param location - The current location object from the route
 * @throws Redirect to login page with return URL if not authenticated
 */
export const requireAuth = async ({ location }: { location: { href: string } }) => {
  const isAuthenticated = selectIsAuthenticated(authStore.state) || sessionStorage.getItem("accessToken") !== null;
  
  if (!isAuthenticated) {
    throw redirect({
      to: PATHS.LOGIN,
      search: {
        redirect: location.href,
      },
    });
  }
};
