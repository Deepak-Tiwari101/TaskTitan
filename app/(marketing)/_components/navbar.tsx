"use client";

import {Logo} from "@/components/Logo";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";

export const Navbar = () => {
    const router = useRouter()
    const [isNavigating, setIsNavigating] = useState({
        signIn: false,
        signUp: false
    });

    const handleNavigation = (path: '/sign-in' | '/sign-up') => {
        setIsNavigating({
            signIn: path === '/sign-in',
            signUp: path === '/sign-up'
        });
        router.push(path);
    }
    return (
        <div className="fixed top-0 z-50 w-full h-14 bg-white/30 border-b shadow-md border-white/20 p-2 rounded-lg">
            <div className="flex items-center justify-between md:max-w-screen-2xl px-2">
                <Logo/>
                <div className="space-x-6 md:block md:w-auto flex items-center justify-between w-full">
                    <Button
                        className="cursor-pointer"
                        size="sm"
                        variant="outline"
                        onClick={() => handleNavigation('/sign-in')}
                        disabled={isNavigating.signIn}
                    >
                        {isNavigating.signIn ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin">
                                Logging In
                            </Loader2>
                        ) : 'Login'}
                    </Button>

                    <Button
                        className="cursor-pointer"
                        size="sm"
                        disabled={isNavigating.signUp}
                        onClick={() => handleNavigation('/sign-up')}
                    >
                        {isNavigating.signUp ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin">
                                Signing Up
                            </Loader2>
                        ) : 'Sign up for free'}
                    </Button>
                </div>
            </div>
        </div>
    )
};