import { authOptions } from "@/libs/auth";
import { getProduct } from "@/libs/apis";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
});

type RequestData = {
    productSlug: string;
    quantity: number;
    height: number;
    width: number;
    supportType: string;
    prindereType: string;
    totalPrice: number;
    discount: number;
    unitPrice: number;
   
  }


  export async function POST(req: Request, res: Response) {
    const {
        productSlug,
        quantity,
        height,
        width,
        supportType,
        prindereType,
        totalPrice,
        discount,
        unitPrice,
        
      
    }: RequestData = await req.json();

    if (!productSlug ) {
        return new NextResponse("Please fill in all required fields", { status: 400 });
    }

    const origin = req.headers.get('origin');

    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Authentication required", { status: 400 });
    }

    const userId = session.user.id;

    try {
        const product = await getProduct(productSlug);
        const discountPrice = product.price - (product.price / 100) * product.discount;
        

        console.log('Received request data:', req.body);
        // Stripe payment
        const stripeSession = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [{
                quantity: 1,
                price_data: {
                    currency: 'ron',
                    product_data: {
                        name: product.name,
                        images: product.images.map(image => image.url),
                    },
                    unit_amount: parseInt((totalPrice * 100).toString()),
                },
            }],
            payment_method_types: ['card'],
            success_url: `${origin}/users/${userId}`,
            metadata: {
                quantity,
                height,
                width,
                supportType,
                prindereType,
                product: product._id,
                user: userId,
                discount,
                totalPrice,
                unitPrice:product.price


            }
        });

        return NextResponse.json(stripeSession, {
            status: 200,
            statusText: 'Payment session created',
        });
    } catch (error: any) {
        console.log("Payment failed", error);
        return new NextResponse(error.message, { status: 500 });
    }
}