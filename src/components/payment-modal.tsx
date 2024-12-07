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
import { useState } from "react";

interface PaymentModalProps {
    restaurant: { name: string };
    isOpen: boolean;
    onClose: () => void;
}

export function PaymentModal({
    restaurant,
    isOpen,
    onClose,
}: PaymentModalProps) {
    const [amount, setAmount] = useState("");

    const handlePayment = () => {
        // Here you would typically process the payment
        console.log(`Processing payment of $${amount} for ${restaurant.name}`);
        onClose();
    };

    const baseAmount = parseFloat(amount) || 0;
    const serviceFee = baseAmount * 0.1;
    const tax = baseAmount * 0.08;
    const totalAmount = baseAmount + serviceFee + tax;

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
                        <span>Service Fee (10%):</span>
                        <span className="text-right">
                            ${serviceFee.toFixed(2)}
                        </span>
                        <span>Tax (8%):</span>
                        <span className="text-right">${tax.toFixed(2)}</span>
                        <span className="font-bold">Total:</span>
                        <span className="font-bold text-right">
                            ${totalAmount.toFixed(2)}
                        </span>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handlePayment}>
                        Pay ${totalAmount.toFixed(2)}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
