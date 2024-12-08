"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
    username: string;
    walletConnected: boolean;
} | null;

type AuthContextType = {
    user: User;
    login: (username: string, walletConnected: boolean) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const router = useRouter();
    // const [anonAadhaar] = useAnonAadhaar();
    // const [, latestProof] = useProver();

    // useEffect(() => {
    //   if (anonAadhaar.status === "logged-in" && !user) {
    //     console.log(anonAadhaar.status);
    //     setUser({
    //         username: latestProof
    //     })
    //   }
    // }, [anonAadhaar]);

    // const switchAadhaar = () => {
    //   setUseTestAadhaar(!useTestAadhaar);
    // };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (username: string, walletConnected: boolean) => {
        const newUser = { username, walletConnected };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    const logout = () => {
        localStorage.removeItem("anonAadhaar");
        window.location.reload();
        router.replace("/");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
