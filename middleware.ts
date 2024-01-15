// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';

// the following code is taken from : https://nextjs.org/docs/advanced-features/middleware#setting-headers

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
