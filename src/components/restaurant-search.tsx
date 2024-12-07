"use client";

import { IRestaurantApi } from "@/app/types/restaurant";
import { PaymentModal } from "@/components/payment-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/auth-context";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const fetchRestaurants = async (): Promise<IRestaurantApi[]> => {
    const { data } = await axios.get("/api/restaurants");
    return data;
};

export function RestaurantSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRestaurant, setSelectedRestaurant] =
        useState<IRestaurantApi>();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();

    const {
        data: restaurants,
        isLoading,
        error,
    } = useQuery<IRestaurantApi[]>({
        queryKey: ["restaurants"],
        queryFn: fetchRestaurants,
    });

    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>Error: {error.message}</p>;

    const filteredRestaurants = restaurants?.filter(
        (restaurant) =>
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRestaurantSelect = (restaurant: IRestaurantApi) => {
        setSelectedRestaurant(restaurant);
        setIsPaymentModalOpen(true);
    };

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold">
                        Welcome, {user?.username}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Wallet status:{" "}
                        {user?.walletConnected ? "Connected" : "Not connected"}
                    </p>
                </div>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
            <div className="space-y-2">
                <Label htmlFor="search">Search Restaurants</Label>
                <Input
                    id="search"
                    type="text"
                    placeholder="Search by name or cuisine..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Cuisine</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredRestaurants?.map((restaurant) => (
                        <TableRow key={restaurant.id}>
                            <TableCell>{restaurant.name}</TableCell>
                            <TableCell>{restaurant.cuisine}</TableCell>
                            <TableCell>{restaurant.rating}</TableCell>
                            <TableCell>
                                <Button
                                    onClick={() =>
                                        handleRestaurantSelect(restaurant)
                                    }
                                >
                                    Select
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {selectedRestaurant && (
                <PaymentModal
                    restaurant={selectedRestaurant}
                    isOpen={isPaymentModalOpen}
                    onClose={() => setIsPaymentModalOpen(false)}
                />
            )}
        </div>
    );
}
