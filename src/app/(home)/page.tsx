"use client";

import AuthRegister from "@/components/auth-register";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAnonAadhaar } from "@anon-aadhaar/react";
import { Coins, Menu, Shield, Users } from "lucide-react";
import Link from "next/link";
import { ReactNode, useMemo } from "react";
import DashboardPage from "./dashboard";

type IAppHome = {
    restaurantsList: ReactNode;
};

export default function AppHome({ restaurantsList }: IAppHome) {
    // const router = useRouter();
    // const path = usePathname();
    const [anonAadhaar] = useAnonAadhaar();
    const isLoggedIn = useMemo(
        () => anonAadhaar.status === "logged-in",
        [anonAadhaar.status]
    );

    // console.log(path);

    // useEffect(() => {
    //     // if (isLoggedIn && path === "/") {
    //     //     router.push("/dashboard");
    //     // }
    // }, [isLoggedIn, path]);

    if (isLoggedIn) {
        return <DashboardPage />;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center border-b">
                <Link className="flex items-center justify-center" href="#">
                    <span className="font-bold text-xl">EOL</span>
                </Link>
                <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4"
                        href="#features"
                    >
                        Features
                    </Link>
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4"
                        href="#how-it-works"
                    >
                        How It Works
                    </Link>
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4"
                        href="#tokenomics"
                    >
                        Tokenomics
                    </Link>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <nav className="flex flex-col gap-4">
                            <Link
                                className="text-sm font-medium hover:underline underline-offset-4"
                                href="#features"
                            >
                                Features
                            </Link>
                            <Link
                                className="text-sm font-medium hover:underline underline-offset-4"
                                href="#how-it-works"
                            >
                                How It Works
                            </Link>
                            <Link
                                className="text-sm font-medium hover:underline underline-offset-4"
                                href="#tokenomics"
                            >
                                Tokenomics
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </header>
            <main className="flex-1">
                <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary-foreground">
                                    Revolutionize Restaurant Loyalty
                                </h1>
                                <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                                    Earn rewards, protect your privacy, and
                                    engage with your favorite restaurants like
                                    never before.
                                </p>
                            </div>
                            <AuthRegister />
                        </div>
                    </div>
                </section>
                <section
                    id="features"
                    className="w-full py-12 md:py-24 lg:py-32 bg-background flex justify-center"
                >
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                            Key Features
                        </h2>
                        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                            <div className="flex flex-col items-center text-center">
                                <Shield className="h-12 w-12 mb-4 text-primary" />
                                <h3 className="text-lg font-bold">
                                    User Anonymity
                                </h3>
                                <p className="text-muted-foreground">
                                    Interact with restaurants without revealing
                                    your identity.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <Coins className="h-12 w-12 mb-4 text-primary" />
                                <h3 className="text-lg font-bold">
                                    EOL Token Utility
                                </h3>
                                <p className="text-muted-foreground">
                                    Earn and use EOL tokens for rewards and
                                    engagement.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <Users className="h-12 w-12 mb-4 text-primary" />
                                <h3 className="text-lg font-bold">
                                    Community Engagement
                                </h3>
                                <p className="text-muted-foreground">
                                    Vote on proposals and participate in
                                    restaurant campaigns.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="how-it-works"
                    className="w-full py-12 md:py-24 lg:py-32 bg-muted flex justify-center"
                >
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                            How It Works
                        </h2>
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold">
                                    Simple Steps to Get Started
                                </h3>
                                <ol className="list-decimal list-inside space-y-2">
                                    <li>
                                        Sign up anonymously using Anon Aadhaar
                                    </li>
                                    <li>
                                        Make UPI transactions at participating
                                        restaurants
                                    </li>
                                    <li>
                                        Earn EOL tokens for your purchases and
                                        engagement
                                    </li>
                                    <li>
                                        Use tokens for discounts or participate
                                        in DeFi activities
                                    </li>
                                    <li>
                                        Vote on restaurant proposals and help
                                        shape the community
                                    </li>
                                </ol>
                            </div>
                            <div className="aspect-video">
                                <iframe
                                    src="https://www.loom.com/embed/60d9271a05fc41d2933ff6c80987b8d0"
                                    frameBorder="0"
                                    // mozallowfullscreen
                                    className="w-full h-full rounded-lg shadow-lg"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="tokenomics"
                    className="w-full py-12 md:py-24 lg:py-32 bg-background flex justify-center"
                >
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                            EOL Tokenomics
                        </h2>
                        <div className="grid gap-10 sm:grid-cols-2 items-center">
                            <svg
                                width="400"
                                height="400"
                                viewBox="0 0 42 42"
                                xmlns="http://www.w3.org/2000/svg"
                                // style=""
                            >
                                {/* <!-- Background Circle --> */}
                                <circle
                                    r="16"
                                    cx="21"
                                    cy="21"
                                    fill="#f5f5f5"
                                ></circle>

                                {/* <!-- Tokenomics Segments --> */}
                                <circle
                                    r="16"
                                    cx="21"
                                    cy="21"
                                    fill="transparent"
                                    stroke="#4caf50"
                                    strokeWidth="32"
                                    strokeDasharray="40 60"
                                    transform="rotate(-90) translate(-42)"
                                ></circle>
                                <circle
                                    r="16"
                                    cx="21"
                                    cy="21"
                                    fill="transparent"
                                    stroke="#2196f3"
                                    strokeWidth="32"
                                    strokeDasharray="30 70"
                                    strokeDashoffset="-40"
                                    transform="rotate(-90) translate(-42)"
                                ></circle>
                                <circle
                                    r="16"
                                    cx="21"
                                    cy="21"
                                    fill="transparent"
                                    stroke="#ff9800"
                                    strokeWidth="32"
                                    strokeDasharray="20 80"
                                    strokeDashoffset="-70"
                                    transform="rotate(-90) translate(-42)"
                                ></circle>
                                <circle
                                    r="16"
                                    cx="21"
                                    cy="21"
                                    fill="transparent"
                                    stroke="#f44336"
                                    strokeWidth="32"
                                    strokeDasharray="10 90"
                                    strokeDashoffset="-90"
                                    transform="rotate(-90) translate(-42)"
                                ></circle>

                                {/* <!-- Title --> */}
                                <text
                                    x="21"
                                    y="9"
                                    fill="#333"
                                    font-size="2"
                                    text-anchor="middle"
                                    font-weight="bold"
                                >
                                    EOL Tokenomics
                                </text>

                                {/* <!-- Descriptions --> */}
                                <text
                                    x="21"
                                    y="25"
                                    fill="#4caf50"
                                    font-size="1.5"
                                    text-anchor="middle"
                                >
                                    40% Community
                                </text>
                                <text
                                    x="21"
                                    y="27"
                                    fill="#2196f3"
                                    font-size="1.5"
                                    text-anchor="middle"
                                >
                                    30% Staking
                                </text>
                                <text
                                    x="21"
                                    y="29"
                                    fill="#ff9800"
                                    font-size="1.5"
                                    text-anchor="middle"
                                >
                                    20% Team
                                </text>
                                <text
                                    x="21"
                                    y="31"
                                    fill="#f44336"
                                    font-size="1.5"
                                    text-anchor="middle"
                                >
                                    10% Reserve
                                </text>
                            </svg>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold">
                                    Token Distribution
                                </h3>
                                <ul className="space-y-2">
                                    <li>User Rewards: 50%</li>
                                    <li>Development Fund: 20%</li>
                                    <li>Liquidity Pools: 15%</li>
                                    <li>Marketing and Partnerships: 10%</li>
                                    <li>Team and Advisors: 5%</li>
                                </ul>
                                <p className="text-muted-foreground">
                                    EOL tokens offer utility within the app,
                                    including discounts, exclusive offers, and
                                    voting power in governance decisions.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-muted-foreground">
                    © 2024 EOL Restaurant Loyalty. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        href="#"
                    >
                        Terms of Service
                    </Link>
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        href="#"
                    >
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    );
}
