import { LoginModal } from "@/components/login-modal";
import { ReactNode } from "react";

type IAppHome = {
    restaurantsList: ReactNode;
};

export default function AppHome({ restaurantsList }: IAppHome) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md w-96 text-center">
                <h1 className="mb-6 text-2xl font-bold">
                    Welcome to Restaurant Dashboard
                </h1>
                <LoginModal />
            </div>
        </div>
    );
}
