'use client'

import {useUser} from "@clerk/nextjs";
import {useEffect, useRef, useState} from "react";

export default function Home() {
    const { isSignedIn } = useUser();
    const [loadingUserSync, setLoadingUserSync] = useState(true);
    const hasSynced = useRef(false);

    useEffect(() => {
        if(!isSignedIn || hasSynced.current) return;

        hasSynced.current = true;

        const syncUser = async () => {
            try {
                const response = await fetch("/api/users", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-internal-secret': process.env.NEXT_PUBLIC_INTERNAL_SECRET!
                    },
                })
                const data = await response.json();
                if(data.error) throw new Error(data.error);
            } catch (e) {
                console.error("Failed to sync user", e);
            } finally {
                setLoadingUserSync(false);
            }
        }
        syncUser();
    }, [isSignedIn]);

    return (
        <div>
            {loadingUserSync ? (
                <div className='flex items-center justify-center h-screen'>Loading...</div>
            ) : (
                <div>Home</div>
            )}
        </div>
    )
}