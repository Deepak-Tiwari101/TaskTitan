import {Navbar} from "@/app/(dashboard)/_components/navbar";
import {ClerkProvider} from "@clerk/nextjs";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <ClerkProvider>
            <div className="h-full bg-slate-100">
                <Navbar/>
                {children}
            </div>
        </ClerkProvider>
    )
}
