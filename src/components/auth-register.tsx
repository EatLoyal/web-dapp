"use client";

import { toast } from "@/hooks/use-toast";
import {
    LogInWithAnonAadhaar,
    useAnonAadhaar,
    useProver,
} from "@anon-aadhaar/react";
import { ethers } from "ethers";
import { useEffect } from "react";

export default function AuthRegister() {
    const [anonAadhaar] = useAnonAadhaar();
    const [, latestProof] = useProver();

    useEffect(() => {
        if (anonAadhaar.status === "logged-in" && !!latestProof) {
            registerUser({ latestProof });
        }
    }, [anonAadhaar, latestProof]);

    const registerUser = async ({ latestProof }: any) => {
        try {
            // Get wallet signature

            const sessionSalt = ethers.keccak256(
                ethers.toUtf8Bytes(`device-${Date.now()}`)
            );
            const enhancedNullifier = ethers.keccak256(
                ethers.AbiCoder.defaultAbiCoder().encode(
                    ["bytes32", "string", "string"],
                    [
                        latestProof?.proof?.nullifier || "",
                        sessionSalt || "",
                        process?.env?.NEXT_PUBLIC_NULLIFIER_SEED || "1",
                    ]
                )
            );

            console.log("Generated Enhanced Nullifier:", {
                enhancedNullifier,
                nullifier: latestProof?.proof?.nullifier,
            });

            const provider = new ethers.BrowserProvider(window?.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            if (!accounts || accounts.length === 0) {
                throw new Error("MetaMask authorization is required.");
            }
            const signer = await provider.getSigner();
            const signature = await signer.signMessage(
                ethers.getBytes(enhancedNullifier)
            );
            console.log("signature", signature);

            // Step 4: Interact with the smart contract
            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
                [
                    "function registerUser(bytes32 nullifier, bytes signature) public",
                ],
                signer
            );

            const tx = await contract.registerUser(
                enhancedNullifier,
                ethers.getBytes(signature)
            );
            await tx.wait();

            console.log("User registered successfully:", tx.hash);
        } catch (err) {
            console.error(err);
            toast({
                title: "Error during registration.",
            });
        }
    };

    return (
        <LogInWithAnonAadhaar
            nullifierSeed={
                (process?.env?.NEXT_PUBLIC_NULLIFIER_SEED || 1) as number
            }
        />
    );
}
