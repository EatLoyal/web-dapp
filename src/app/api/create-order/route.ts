import Razorpay from "razorpay";

export async function POST(req) {
    try {
        const body = await req.json();

        console.log("create order", body);

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || "",
            key_secret: process.env.RAZORPAY_KEY_SECRET || "",
        });

        const order = await razorpay.orders.create({
            amount: body.amount, // Amount in paise
            currency: "INR",
            receipt: body.receipt,
        });

        console.log("razorpay order", order);

        return new Response(JSON.stringify(order), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}

export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            Allow: "POST, OPTIONS",
        },
    });
}
