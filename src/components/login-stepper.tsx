"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginStepperProps {
    onClose: () => void;
}

export function LoginStepper({ onClose }: LoginStepperProps) {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { toast } = useToast();
    const { login } = useAuth();
    const router = useRouter();

    const handleNextStep = () => {
        if (step === 1 && username && password) {
            toast({
                title: "Step 1 Complete",
                description: "Username and password validated successfully.",
            });
            setStep(2);
        }
    };

    const handleConnectWallet = () => {
        // In a real application, you would implement the wallet connection logic here
        console.log("Connecting Okto Wallet...");
        toast({
            title: "Wallet Connected",
            description: "Okto Wallet connected successfully.",
        });
        login(username, true);
        onClose();
        router.push("/dashboard");
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between mb-4">
                <div
                    className={`w-1/2 h-1 ${
                        step >= 1 ? "bg-blue-500" : "bg-gray-200"
                    }`}
                />
                <div
                    className={`w-1/2 h-1 ${
                        step >= 2 ? "bg-blue-500" : "bg-gray-200"
                    }`}
                />
            </div>

            {step === 1 && (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        onClick={handleNextStep}
                        disabled={!username || !password}
                        className="w-full"
                    >
                        Next
                    </Button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    <p className="text-center">
                        Connect your Okto Wallet to complete the login process.
                    </p>
                    <Button onClick={handleConnectWallet} className="w-full">
                        Connect Okto Wallet
                    </Button>
                </div>
            )}
        </div>
    );
}
