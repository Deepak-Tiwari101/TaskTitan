import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

type BoardVisibility = 'PUBLIC' | 'PRIVATE';

export async function GET() {
    try {
        const {userId} = await auth();
        if(!userId) return NextResponse.json({error: "Unauthorized"}, {status: 401});

        const boards = await prisma.board.findMany({
            where: {
                members: {
                    some: {
                        userId
                    }
                }
            },
            include: {
                owner: true,
                members: true
            }
        });
        return NextResponse.json(boards, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}

export async function POST(request: Request) {
    try {
        const {userId} = await auth();
        if (!userId) return NextResponse.json({error: "Unauthorized"}, {status: 401});

        const body = await request.json() as { title: string; visibility?: BoardVisibility }
        const {title, visibility} = body;

        if (!title) return new NextResponse("Title is required", {status: 400});

        const finalVisibility: BoardVisibility = visibility && visibility === 'PRIVATE' ? 'PRIVATE' : 'PUBLIC';

        const board = await prisma.board.create({
            data: {
                title,
                visibility: finalVisibility,
                ownerId: userId,
                members: {
                    create: {
                        userId,
                        role: 'ADMIN'
                    }
                }
            },
            include: {
                owner: true,
                members: true
            },
        });

        return NextResponse.json(board, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}
