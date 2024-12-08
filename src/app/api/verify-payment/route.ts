import Razorpay from "razorpay";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { paymentId, orderId, signature, userId } = req.body; // Capture payment details and user ID

        // const razorpay = new Razorpay({
        //     key_id: process.env.RAZORPAY_KEY_ID,
        //     key_secret: process.env.RAZORPAY_KEY_SECRET,
        // });

        // Validate Razorpay signature
        // const isValidSignature = razorpay.plans.({
        //     order_id: orderId,
        //     payment_id: paymentId,
        //     signature: signature,
        // });

        // if (isValidSignature) {
        // Mint EOL Tokens (Call minting contract)
        const mintResult = await fetch("/api/mint-token", {
            method: "POST",
            body: JSON.stringify({ userId }),
            headers: { "Content-Type": "application/json" },
        });

        const mintResponse = await mintResult.json();

        res.status(200).json({ success: true, mintResponse });
        // } else {
        //     res.status(400).json({
        //         success: false,
        //         message: "Invalid signature",
        //     });
        // }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
