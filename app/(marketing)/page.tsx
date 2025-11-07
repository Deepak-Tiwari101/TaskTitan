import {Medal} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Poppins} from "next/font/google";
import {cn} from "@/lib/utils";

const poppinsFont = Poppins({
    subsets: ["latin"],
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900"
    ]
})

export default function MarketingPage() {
    return (
        <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center flex-col">
                <div className="flex flex-row items-center justify-between bg-amber-200 p-4
                mb-4 rounded-full shadow-sm uppercase">
                    <Medal className="h-6 w-6 mr-2"/>
                    No.1 Task management
                </div>
                <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
                    TaskTitan: Collaborate Visually
                </h1>
                <div className="text-3xl md:text-6xl text-white bg-gradient-to-r px-4 p-2 pb-4
                 from-fuchsia-700 to-pink-600 rounded-full w-fit">
                    work forward.
                </div>
                <div className={cn("mt-4 text-neutral-400 text-sm md:text-xl w-1/2 text-center", poppinsFont.className)}>
                    Workspace where teams organize tasks, track progress, and hit deadlines together.
                    Drag, drop, and watch updates happen in real-time.
                </div>
                <div className="font-semibold text-lg md:text-2xl mt-1 text-center">
                    &quot;The intuitive workspace for modern teams.&quot;
                </div>
                <Button className="mt-6" size="lg" asChild>
                    <Link href="/sign-up">
                        Get started for free
                    </Link>
                </Button>
            </div>
        </div>
    )
}