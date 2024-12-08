"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import convertINRToEOL from "@/lib/convertINRToEOL";
import { ethers } from "ethers";
import { useEffect, useId, useState } from "react";

interface PaymentModalProps {
    restaurant: { name: string };
    isOpen: boolean;
    onClose: () => void;
}

type IRPOptions = {
    key: string;
    amount: string;
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id?: string;
    callback_url?: string;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    notes?: Record<string, string>;
    theme?: {
        color?: string;
    };
};

const RazorpayButton = ({
    options,
    label,
    disabled,
}: {
    options: IRPOptions;
    label: string;
    disabled: boolean;
}) => {
    useEffect(() => {
        // Dynamically load the Razorpay script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Clean up the script when the component unmounts
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = () => {
        if (
            typeof window !== "undefined" &&
            window?.Razorpay &&
            typeof window?.Razorpay === "function"
        ) {
            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();
        }
    };

    return (
        <Button id="rzp-button1" onClick={handlePayment} disabled={disabled}>
            {label}
        </Button>
    );
};

export function PaymentModal({
    restaurant,
    isOpen,
    onClose,
}: PaymentModalProps) {
    const [amount, setAmount] = useState("");
    const receiptid = useId();
    const [orderId, setOrderId] = useState(null);

    console.log("jknkjnkjnkj", restaurant, isOpen);

    useEffect(() => {
        // Create Razorpay order
        fetch("/api/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: parseFloat(amount) * 100,
                receipt: `receipt#${receiptid}`,
            }),
        })
            .then((res) => res.json())
            .then((data) => setOrderId(data.id));
    }, [amount, receiptid]);

    const handlePaymentSuccess = async () => {
        try {
            const provider = new ethers.BrowserProvider(window?.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            if (!accounts || accounts.length === 0) {
                throw new Error("MetaMask authorization is required.");
            }
            const signer = await provider.getSigner();

            const contractAddress =
                process?.env?.NEXT_PUBLIC_CONTRACT_ADDRESS || "";
            const abi = [
                // Replace with your contract ABI
                "function mintTokens(uint256 amount) external",
            ];
            const contract = new ethers.Contract(contractAddress, abi, signer);

            // Mint tokens
            const txn = await contract.mintTokens(
                convertINRToEOL(parseFloat(amount))
            );
            await txn.wait();

            // toast({
            //     variant: "default",
            //     title: `Success`,
            //     description: (
            //         <Link href={`https://sepolia.etherscan.io/tx/${txn.hash}`}>
            //             {txn.hash}
            //         </Link>
            //     ),
            // });
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: error as string,
            });
            throw error;
        }
    };

    const baseAmount = parseFloat(amount) || 0;
    const platformFee = baseAmount * 0.015;

    const totalAmount = baseAmount + platformFee;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Payment for {restaurant.name}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Amount
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <span>Platform Fee (1.5%):</span>
                        <span className="text-right">
                            ₹{platformFee.toFixed(2)}
                        </span>
                        <span className="font-bold">Total:</span>
                        <span className="font-bold text-right">
                            ₹{totalAmount.toFixed(2)}
                        </span>
                    </div>
                </div>
                <DialogFooter>
                    {/* <RazorpayButton
                        options={{
                            key: "rzp_test_kMWLFmUOfmcbuw",
                            amount: `${parseFloat(amount) * 100}`,
                            currency: "INR",
                            name: restaurant.name,
                            description: "Test Transaction",
                            image: "https://raw.githubusercontent.com/Bedrock-Technology/bedrock-static/main/logo/velodrome.svg",
                            order_id: orderId || "",
                            handler: (response) => {
                                handlePaymentSuccess();
                            },
                            prefill: {
                                name: "XXX",
                                email: "shyam.mittal@gmail.com",
                                contact: "9000090000",
                            },
                            notes: {
                                address: "Razorpay Corporate Office",
                            },
                            theme: {
                                color: "#3399cc",
                            },
                        }}
                        label={`Pay ${totalAmount.toFixed(2)}`}
                        disabled={!orderId}
                    /> */}
                    <Button onClick={handlePaymentSuccess}>Mint </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
