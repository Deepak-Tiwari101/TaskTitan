import {Logo} from "@/components/Logo";
import {Searchbar} from "@/app/(dashboard)/_components/searchbar";
import {UserButton} from "@clerk/nextjs";
import {NotificationBell} from "@/app/(dashboard)/_components/notification";
import {Button} from "@/components/ui/button";

export const Navbar = () => {
    return (
        <div className="sticky top-0 z-50 w-full h-14 bg-white/30 border-b shadow-md border-white/20 p-2 rounded-lg
                        flex items-center justify-between px-2">
            <Logo/>
            <div className="flex items-center gap-x-1 cursor-pointer">
                <Searchbar/>
                <Button
                    className="cursor-pointer h-10 bg-blue-700"
                    size="sm"
                    variant="default"
                >
                    Create
                </Button>
            </div>
            <div className="flex items-center gap-x-3 cursor-pointer ">
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