import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    "/", // make homepage public
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhooks(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    if (isPublicRoute(req)) return; // <-- allow public routes

    await auth.protect()
});

export const config = {
    matcher: [
        // Run middleware for all routes except static files and Next internals
        "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js|json)).*)",
        "/(api|trpc)(.*)",
    ],
};
