import { Inter } from "next/font/google";
import "./globals.css";
import RootProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Restaurant Dashboard",
    description: "Search restaurants and make payments",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <RootProvider>{children}</RootProvider>
            </body>
        </html>
    );
}
