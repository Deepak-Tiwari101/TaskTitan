import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET({params}: { params: { boardId: string } }) {
    try {
        const {boardId} = params;
        const board = await prisma.board.findUnique({
            where: {
                id: boardId
            }
        });
        if (!board) return NextResponse.json({error: "Board not found"}, {status: 404});
        return NextResponse.json(board, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

export async function DELETE(request: Request, {params}: { params: { boardId: string } }) {
    try {
        const {userId} = await auth();
        if (!userId) return NextResponse.json({error: "Unauthorized"}, {status: 401});

        const {boardId} = params;
        // only allow the user to delete if they are the owner of the board
        const {count} = await prisma.board.deleteMany({
            where: {
                id: boardId,
                ownerId: userId
            }
        });
        if (count == 0) {
            // could be either "board not found" or "unauthorized"
            const boardExists = await prisma.board.findUnique({
                where: {
                    id: boardId
                }
            });
            if (!boardExists) return NextResponse.json({error: "Board not found"}, {status: 404});
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        return NextResponse.json({status: 204});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}

export async function PATCH(request: Request) {
    const {userId} = await auth();
    if (!userId) return NextResponse.json({error: "Unauthorized"}, {status: 401});

    const body = await request.json() as { boardId: string, title?: string, visibility?: 'PUBLIC' | 'PRIVATE' };
    const {boardId, title, visibility} = body;
    if (!boardId) return NextResponse.json({error: "Board ID is required"}, {status: 400});

    const board = prisma.board.update({
        where: {
            id: boardId
        },
        data: {
            title,
            visibility
        }
    });
    return NextResponse.json(board, {status: 200});
}
