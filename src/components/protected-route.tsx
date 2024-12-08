"use client";

import { useAnonAadhaar } from "@anon-aadhaar/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const path = usePathname();
    const [anonAadhaar] = useAnonAadhaar();
    const isLoggedIn = useMemo(
        () => anonAadhaar.status === "logged-in",
        [anonAadhaar, path]
    );

    useEffect(() => {
        if (isLoggedIn && path === "/") {
            console.log("ever going into this");
            router.push("/dashboard");
        } else if (!isLoggedIn && path !== "/") {
            console.log("ever going into this too");
            router.push("/");
        }
    }, [isLoggedIn, router, path]);

    if (isLoggedIn) {
        return <>{children}</>;
    }

    return null;
}
