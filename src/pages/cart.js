import Head from "next/head"
import Image from "next/image"
import { useSelector } from "react-redux"
import CartProduct from "../components/CartProduct"
import Header from "../components/Header"
import { selectItems, selectTotal } from "../slices/cartSlice"
import FlipMove from "react-flip-move"
import Currency from "react-currency-formatter"
import { useSession } from "next-auth/client"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
const stripePromise = loadStripe(process.env.stripe_public_key);

function Cart() {
    const items = useSelector(selectItems);
    const [session] = useSession();
    const total = useSelector(selectTotal);

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;

        const checkoutSession = await axios.post("/api/create-checkout-session", {
            items,
            email: session.user.email
        })

        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if (result.error) {
            alert(result.error.message);
        }
    }

    return (
        <div className="bg-gray-100">
            <Head>
                <title>Your Shopping Cart</title>
            </Head>

            <Header />

            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* Left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image src="https://links.papareact.com/ikj" width={1020} height={250} objectFit="contain" />

                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">
                            {items.length === 0 ? 'Your Amazon Cart is empty.' : 'Your Shopping Cart'}
                        </h1>

                        <FlipMove>
                            {items.map(({ id, title, price, rating, description, category, image, hasPrime }, i) => (
                                <CartProduct
                                    key={id}
                                    id={id}
                                    title={title}
                                    price={price}
                                    rating={rating}
                                    description={description}
                                    category={category}
                                    image={image}
                                    hasPrime={hasPrime}
                                />
                            ))}
                        </FlipMove>
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-col bg-white p-10 shadow-md">
                    {items.length > 0 && (
                        <>
                            <h2 className="whitespace-nowrap">Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'}):{" "}
                                <span className="font-bold">
                                    <Currency quantity={total} currency="CAD" />
                                </span>
                            </h2>
                            <button
                                role="link"
                                onClick={createCheckoutSession}
                                disabled={!session}
                                className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed whitespace-nowrap"}`}
                            >
                                {!session ? "Sign in to checkout" : "Proceed to Checkout"}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Cart
