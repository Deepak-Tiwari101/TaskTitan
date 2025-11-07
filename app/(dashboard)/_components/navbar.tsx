import {Logo} from "@/components/Logo";
import {Searchbar} from "@/app/(dashboard)/_components/searchbar";
import {UserButton} from "@clerk/nextjs";
import {NotificationBell} from "@/app/(dashboard)/_components/notification";

export const Navbar = () => {
    return (
        <div className="fixed top-0 z-50 w-full h-14 bg-white/30 border-b shadow-md border-white/20 p-2 rounded-lg
                        flex items-center justify-between px-2">
            <Logo/>
            <Searchbar/>
            <div className="flex items-center space-x-4 gap-x-3 cursor-pointer ">
                <NotificationBell />
                <UserButton appearance={{
                    elements: {
                        userButtonBox: "scale-120 p-2"
                    }
                }}/>
            </div>

        </div>
    )
}