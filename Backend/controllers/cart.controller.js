import Cart from "../model/cart.model.js";
import Color from "../model/color.model.js";
import Size from "../model/size.model.js";
import Product from "../model/product.model.js";

export const getCarts = async (request, response) => {
    const { _id: userId } = request.user;

    const cart = await Cart.findOne({ userId })

    if (!cart) {
        return response.status(404).send({ error: "Please filled up" })
    }

    response.status(200).send(cart)
    console.log(getCarts);
};

export const addCarts = async (request, response) => {
    const { _id: userId } = request.user;
    const { productId, color, size, quantity, price } = request.body;

    if (!productId || !color || !size || !quantity || !price) {
        return response.status(400).send({ error: "Please fill all fields" });
    }

    const existingUserCart = await Cart.findOne({ userId })
        .populate('cartItems.color')
        .populate('cartItems.size').populate("cartItems.productId")


    const newCartItem = {
        productId,
        color,
        size,
        quantity,
        price
    }

    const givenColor = await Color.findOne({ _id: color });
    const givenSize = await Size.findOne({ _id: size });
    const givenProduct = await Product.findOne({ _id: productId })

    if (existingUserCart) {
        const existingSpecificCartItem = existingUserCart.cartItems.some((cartItem) => {
            return (
                cartItem.color.name === givenColor.name &&
                cartItem.size.name === givenSize.name &&
                cartItem.productId.sku === givenProduct.sku
            );
        });

        if (existingSpecificCartItem) {
            const cartIndex = existingUserCart.cartItems.findIndex((cartItem) => {
                return (
                    cartItem.color.name === givenColor.name &&
                    cartItem.size.name === givenSize.name &&
                    cartItem.productId.sku === givenProduct.sku
                );
            });

            existingUserCart.cartItems[cartIndex].quantity = +quantity +
                +existingUserCart.cartItems[cartIndex].quantity;

            await existingUserCart.save();
            return response.status(200).send(existingUserCart);
        }


        const existingCartItems = existingUserCart.cartItems
        existingCartItems.push(newCartItem)
        await existingUserCart.save()
        response.status(201).send(existingUserCart)

    }
    const newCart = await Cart.create({ userId, cartItems: [newCartItem] })
    if (!newCart) {
        return response.status(400).send({ error: "new cart cannot be created" })
    }

    response.status(201).send(newCart);
};
