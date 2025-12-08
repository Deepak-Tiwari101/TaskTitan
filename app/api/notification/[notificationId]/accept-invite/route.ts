import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/prisma";

export async function POST(request: Request, {params}: {params: {notificationId: string}}) {
    try {
        const notificationId = params.notificationId;
        const currentUserId = (await auth()).toString();

        if(!currentUserId) return NextResponse.json({error: "Unauthorized"}, {status: 401});

        const notification = await prisma.notification.findUnique({
            where: {
                id: notificationId
            }
        });
        if(!notification) return NextResponse.json({error: "Notification not found"}, {status: 404});
        if(notification.userId !== currentUserId) return NextResponse.json({error: "This invite is not for you"}, {status: 403});
        if(notification.type !== "INVITE") return NextResponse.json({error: "Invalid notification type"}, {status: 400});

        const notificationData = notification.data as {boardId: string, inviterId: string, inviterName: string, message: string};
        const board = prisma.board.findUnique({
            where: {
                id: notificationData.boardId
            }
        });
        if(!board) return NextResponse.json({error: "Board no longer exists"}, {status: 404});

        // add member if not already present
        await prisma.boardMember.upsert({
            where: {
                boardId_userId: {
                    boardId: notificationData.boardId,
                    userId: currentUserId,
                }
            },
            update: {},  // no change to be made if user already a member of that board
            create: {
                boardId: notificationData.boardId,
                userId: currentUserId,
                role: "MEMBER"
            }
        });

        // now we can delete the notification
        await prisma.notification.delete({
            where: {
                id: notificationId
            }
        });

        // TODO: emit realtime event to board channel to notify the board members

        return NextResponse.json({status: 200});
    } catch (e) {
        console.error("Error accepting board invite", e);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}