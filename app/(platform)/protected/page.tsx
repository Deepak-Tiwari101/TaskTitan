import {auth, currentUser} from "@clerk/nextjs/server";
import {UserButton} from "@clerk/nextjs";

export default async function ProtectedPage() {
    const user = await currentUser();
    const {userId} = await auth();
    return (
        <div>
            <UserButton
            />
            <br/>
            User: {`${user?.firstName} ${user?.lastName} ${user?.emailAddresses[0].emailAddress}`}
            <br/>
            User id: {user?.id}
            <br/>
            User id via auth: {userId}
        </div>
    );
}