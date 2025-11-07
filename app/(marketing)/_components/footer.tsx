import {Button} from "@/components/ui/button";
import {Logo} from "@/components/Logo";

export const Footer = () => {
    return (
        <div className="fixed bottom-0 z-50 w-full border-t shadow-md bg-slate-100">

            <div className="space-x-2 md:block md:w-auto flex items-center justify-between w-full">
                <Button size="sm" variant="ghost">
                    Privacy Policy
                </Button>

                <Button size="sm" variant="ghost">
                    Terms of Service
                </Button>
            </div>
        </div>
    )
};