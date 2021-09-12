const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { items, email } = req.body;

    const transformedItems = items.map((item) => ({
        description: item.description,
        quantity: 1,
        price_data: {
            currency: "INR",
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image]
            },
        }
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates: ["shr_1JX1x6SCeyEb8e3b3FSlAzUu"],
        shipping_address_collection: {
            allowed_countries: ["CA", "GB", "US", "IN"],
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/cart`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item) => item.image))
        },
    })

    res.status(200).json({ id: session.id });
}