import { NextResponse } from "next/server";
import restaurants from "./config";

export async function GET() {
    return NextResponse.json(restaurants);
}
