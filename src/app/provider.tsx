"use client";

import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/auth-context";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

// Create a query client instance
const queryClient = new QueryClient();

export default function RootProvider({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AnonAadhaarProvider _useTestAadhaar={true} _appName="EatLoyal">
                <AuthProvider>
                    {children}
                    <Toaster />
                </AuthProvider>
            </AnonAadhaarProvider>
        </QueryClientProvider>
    );
}
