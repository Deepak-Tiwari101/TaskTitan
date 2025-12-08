import {auth, currentUser} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST() {
    const {userId} = await auth();
    if (!userId) return NextResponse.json({error: "Unauthorized"}, {status: 401});

    const clerkUser = await currentUser();
    if (!clerkUser) return NextResponse.json({error: "Unauthorized"}, {status: 401});

    const primaryEmail = clerkUser.emailAddresses?.[0]?.emailAddress ?? null;
    const name = clerkUser.fullName ?? clerkUser.username ?? null;
    const avatar = clerkUser.imageUrl ?? null;

    const dbUser = await prisma.user.upsert({
        where: {id: clerkUser.id},
        update: {
            name,
            avatar,
            email: primaryEmail
        },
        create: {
            id: clerkUser.id,
            name,
            avatar,
            email: primaryEmail
        }
    });
    if (!dbUser) return NextResponse.json({error: "User not initialized"}, {status: 500});

    return NextResponse.json(dbUser);
}