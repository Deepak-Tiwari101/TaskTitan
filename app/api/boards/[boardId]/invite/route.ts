import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {auth} from "@clerk/nextjs/server";

type InviteBody = {targetUserId: string}

export async function POST(request: Request, {params}: {params: {boardId: string}}) {
    try {
        const {boardId} = params;
        const board = await prisma.board.findUnique({
            where: {
                id: boardId
            },
            include: {
                owner: true,
                members: true
            }
        });
        if(!board) return NextResponse.json({error: "Board not found"}, {status: 404});

        const {userId} = await auth();
        if(!userId) return NextResponse.json({error: "Unauthorized"}, {status: 401});

        const isOwner = board.ownerId === userId;
        if(!isOwner) return NextResponse.json({error: "You are not allowed to invite members to this board"}, {status: 403});

        const body: InviteBody = await request.json();
        const {targetUserId} = body;
        if(!targetUserId) return NextResponse.json({error: "Target user ID is required"}, {status: 400});

        // check if target user is already a member
        const isMember = board.members.some(
            member => member.userId === targetUserId
        );
        if(isMember) return NextResponse.json({error: "User is already a member"}, {status: 400});

        const inviterUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        const notification = await prisma.notification.create({
            data: {
                userId: targetUserId,
                type: 'INVITE',
                data: {
                    boardId,
                    inviterId: userId,
                    inviterName: inviterUser?.name ?? null,
                    message: `User ${userId} invited you to board ${board.title}`,
                }
            }
        });

        // TODO: emit realtime event to notify the target user

        return NextResponse.json(notification, {status: 201});

    } catch (e) {
        console.error("Error sending board invite", e);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}