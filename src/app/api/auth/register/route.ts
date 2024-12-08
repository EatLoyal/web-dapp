import { NextResponse } from "next/server";
import { ethers } from "ethers";
import contractABI from "@/lib/contracts/EOLUserRegistry.json";

export async function POST(request: Request) {
    const data = await request.json();
    const {
        enhancedNullifier,
        latestProof: proof,
        signature,
        userAddress,
    } = data;

    if (!enhancedNullifier || !proof || !signature || !userAddress) {
        return NextResponse.json({ success: false, error: "Invalid input" });
    }

    try {
        console.log({ enhancedNullifier });

        // Step 1: Validate the user's signature
        const recoveredAddress = ethers.verifyMessage(
            enhancedNullifier,
            signature
        );

        console.log({ recoveredAddress, userAddress });

        if (recoveredAddress.toLowerCase() !== userAddress.toLowerCase()) {
            return NextResponse.json({
                success: false,
                error: "Invalid signature",
            });
        }

        console.log(
            "Signature validated successfully for address:",
            recoveredAddress
        );

        // Step 2: Connect to the contract with admin wallet
        const provider = new ethers.JsonRpcProvider(
            process.env.NEXT_PUBLIC_NETWORK!
        );
        const adminWallet = new ethers.Wallet(
            process.env.ADMIN_PRIVATE_KEY!,
            provider
        );
        const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
            contractABI,
            adminWallet
        );

        // Step 3: Interact with the contract
        const tx = await contract.registerUser(enhancedNullifier, proof);
        await tx.wait();

        console.log("User registered successfully:", tx.hash);

        return NextResponse.json({ success: true, txHash: tx.hash });
    } catch (error: any) {
        console.error("Error registering user:", error);
        return NextResponse.json({
            success: false,
            error: `"Registration failed.": ${error}`,
        });
    }
}
