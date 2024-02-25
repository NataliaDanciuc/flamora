import { createOrder } from "@/libs/apis";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
});
export async function POST(req: Request, res: Response) {
    const reqBody = await req.text();
    const sig = req.headers.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    try {
        if (!sig || !webhookSecret) return;
        event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
    } catch (error: any) {
        return new NextResponse(`Webhook error: ${error.message}`, { status: 500 });
    }

    // loading event

    switch (event.type) {
        case checkout_session_completed:
            const session = event.data.object;

            const {
                metadata: {
                    user,
                    product,
                    totalPrice,
                    discount,
                    quantity,
                    height,
                    width,
                    supportType,
                    prindereType,
                    unitPrice,
                },
            } = session;

            // create an order
            await createOrder({
                user,
                product,
                totalPrice: Number(totalPrice),
                discount: Number(discount),
                quantity: Number(quantity),
                height: Number(height),
                width: Number(width),
                supportType,
                prindereType,
                unitPrice: Number(unitPrice)
            });

            return NextResponse.json("Order successful", {
                status: 200,
                statusText: "Order successful",
            });
        

            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        return NextResponse.json("Event received", {
            status: 200,
            statusText: "Event received",
        });
}