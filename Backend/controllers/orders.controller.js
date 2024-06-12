import Order from "../model/order.model.js"
import Cart from "../model/cart.model.js"


export const getOrders = async (request, response) => {
    const orders = await Order.find()
    if (!orders) return response.status(404).send({ error: "Something went wrong" })
    response.status(200).send(orders)
}

export const getSingleOrder = async (request, response) => {
    const { userId } = request.params
    const singleOrder = await Order.findOne({ userId })
    if (!singleOrder) return response.status(404).send({ error: "Something went wrong" })
    response.status(200).send(singleOrder)
}

export const addOrder = async (request, response) => {
    const { _id: userId } = request.user
    const { totalPrice, orderItems, shippingAdress } = request.body

    for (const value of Object.values(shippingAdress)) {
        if (!value) {
            return response.status(400).send({ error: "please filled up all fields" })
        }
    }

    const orderItemsWithAddress = orderItems.map((orderItems) => {
        return { ...orderItems, shippingAdress }
    })

    const newOrder = await Order.create({
        orderItems: orderItemsWithAddress,
        totalPrice,
        userId
    })



    if (!newOrder) {
        return response.status(400).send({ error: "couldn't create a new order" })
    }

    const userCart = await Cart.findOne({ userId })


    if (!userCart) {
        return response.status(400).send({ error: "Simething is wrong" })
    }

    userCart.cartItems = [];
    await userCart.save()

    const products = await Product.find()

    for (const orderItem of orderItems) {
        const { color: colorId, size: sizeId, productId, quantity } = orderItem
        const product = products.find((product) =>
            product._id.toString() === productId.toString()
        )

        if (product) {
            const stockItem = product.stock.find((stockItem) =>
                stockItem.color.toString() === colorId.toString() &&
                stockItem.size.toString() === sizeId.toString()
            )
            if (stockItem) {
                if (quantity > stockItem.quantity) {
                    return response.status(400).send({ error: "Invalid quantity" })
                }
                stockItem.quantity = stockItem.quantity - quantity
                await product.save()
            }
        }

    }

    response.status(201).send(newOrder)
}

