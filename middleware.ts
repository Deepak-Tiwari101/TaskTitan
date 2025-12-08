import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

const isPublicRoute = createRouteMatcher([
    "/", // make homepage public
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhooks(.*)",
]);

const isApiRoute = createRouteMatcher([
    "/api(.*)"
])

export default clerkMiddleware(async (auth, req) => {
    const {userId} = await auth();
    const url = new URL(req.url);

    if (isApiRoute(req)) {
        const internalSecret: string | null = req.headers.get('x-internal-secret');
        if(internalSecret !== process.env.NEXT_PUBLIC_INTERNAL_SECRET ) {
            return NextResponse.json({error: "Forbidden"}, {status: 403});
        }
        return NextResponse.next();
    }

    if(userId && url.pathname === '/') {
        return NextResponse.redirect(new URL("/home", req.url));
    }

    if (isPublicRoute(req)) return; // <-- allow public routes

    await auth.protect();
});

export const config = {
    matcher: [
        // Run middleware for all routes except static files and Next internals
        "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js|json)).*)",
        "/(api|trpc)(.*)",
    ],
};
