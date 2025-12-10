import { createRouter } from '@tanstack/react-router'
import { AuthContext } from './auth'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {
      auth: undefined!,
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
  
  interface RouteContext {
    auth: AuthContext
  }
}
