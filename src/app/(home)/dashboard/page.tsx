import { ProtectedRoute } from "@/components/protected-route";
import { RestaurantSearch } from "@/components/restaurant-search";

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Restaurant Dashboard
                </h1>
                <RestaurantSearch />
            </div>
        </ProtectedRoute>
    );
}
