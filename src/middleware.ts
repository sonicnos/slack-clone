import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// const isPublicPage = createRouteMatcher(["/auth"]);

// export default convexAuthNextjsMiddleware((request, { convexAuth }) => {
//   console.log(isAuthenticatedNextjs());
//   if (!isPublicPage(request) && !convexAuth.isAuthenticated()) {
//     return nextjsMiddlewareRedirect(request, "/auth");
//   }

//   if (isPublicPage(request) && isAuthenticatedNextjs()) {
//     return nextjsMiddlewareRedirect(request, "/");
//   }
// });

const isSignInPage = createRouteMatcher(["/auth"]);
const isProtectedRoute = createRouteMatcher(["/"]);

export default convexAuthNextjsMiddleware((request, { convexAuth }) => {
  if (isSignInPage(request) && convexAuth.isAuthenticated()) {
    return nextjsMiddlewareRedirect(request, "/");
  }
  if (isProtectedRoute(request) && !convexAuth.isAuthenticated()) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
