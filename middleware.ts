// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';

// the following code is taken from : https://nextjs.org/docs/advanced-features/middleware#setting-headers
export default authMiddleware({
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // Redirect logged in users to organization selection page if they are not active in an organization
    if (
      auth.userId &&
      !auth.orgId &&
      req.nextUrl.pathname !== "/org-selection"
    ) {
      const orgSelection = new URL("/org-selection", req.url);
      return NextResponse.redirect(orgSelection);
    }
    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});
export function middleware(request: NextRequest) {

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
      request: {
        headers : requestHeaders
      },
  });
}

// the following code has been copied from https://nextjs.org/docs/advanced-features/middleware#matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// app/some/where/page.tsx
// import { headers } from 'next/headers';

// export default async function Page() {
//   const pathname = headers.get('x-pathname');
   
//   return <>{/*... your page code */}</>
// }
