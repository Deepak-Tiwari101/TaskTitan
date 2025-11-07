import React from "react";
import {ClerkProvider} from "@clerk/nextjs";

const PlatformLayout = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <ClerkProvider
            signInUrl="/sign-in"
            signUpUrl="/sign-up"
        >
            {children}
        </ClerkProvider>
    )
}

export default PlatformLayout;