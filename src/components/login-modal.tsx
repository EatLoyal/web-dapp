"use client";

import { LoginStepper } from "@/components/login-stepper";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export function LoginModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Login</Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Login</DialogTitle>
                    </DialogHeader>
                    <LoginStepper onClose={() => setIsOpen(false)} />
                </DialogContent>
            </Dialog>
        </>
    );
}
