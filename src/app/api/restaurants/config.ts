import { IRestaurantApi } from "@/app/types/restaurant";

const restaurants: IRestaurantApi[] = [
    {
        id: "8f3c2a7b1e6d4f9a",
        name: "Curry Kingdom",
        address: "123 Spice St, Aroma City",
        cuisine: "Indian",
        rating: 4.6,
        walletAddress: "0xA12B45C89D2E34F67F12C",
        contact: "789-321-6547",
    },
    {
        id: "b47f91c34e5a29df",
        name: "Tandoor Treats",
        address: "456 Masala Ln, Flavor Town",
        cuisine: "Indian",
        rating: 4.8,
        walletAddress: "0xB34D67F21A56C98E01F2A",
        contact: "987-654-3210",
    },
    {
        id: "c67d13f92b8a5e4a",
        name: "Spice Symphony",
        address: "789 Aroma Ave, Heat City",
        cuisine: "Indian",
        rating: 4.7,
        walletAddress: "0xC78E90F45B23D67A21F12",
        contact: "123-456-7890",
    },
];

export default restaurants;
