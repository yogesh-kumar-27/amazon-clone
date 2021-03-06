import Image from "next/image"
import { forwardRef } from "react"
import { StarIcon } from "@heroicons/react/solid"
import Currency from "react-currency-formatter"
import { useDispatch } from "react-redux"
import { addToCart, removeFromCart } from "../slices/cartSlice"

const CartProduct = forwardRef(({ id, title, price, rating, description, category, image, hasPrime }, ref) => {
    const dispatch = useDispatch();

    const addItemToCart = () => {
        const product = {
            id,
            title,
            price,
            rating,
            description,
            category,
            image,
            hasPrime
        }

        dispatch(addToCart(product))
    }

    const removeItemFromCart = () => {
        dispatch(removeFromCart({ id }))
    }

    return (
        <div ref={ref} className="grid grid-cols-5 hover:shadow-2xl">
            <Image src={image} height={200} width={200} objectFit="contain" />

            {/* Middle */}
            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className="flex">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon key={i} className="h-5 text-yellow-500" />
                        ))
                    }
                </div>
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <Currency quantity={price} currency="INR" />

                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img
                            loading="lazy"
                            className="w-12"
                            src="https://links.papareact.com/fdw"
                            alt=""
                        />
                        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                    </div>
                )}
            </div>

            {/* Right */}
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <button className="button" onClick={addItemToCart}>Add to Cart</button>
                <button className="button" onClick={removeItemFromCart}>Remove from Cart</button>
            </div>
            <div className="my-4" />
        </div>
    )
})

export default CartProduct
