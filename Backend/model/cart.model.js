import mongoose from "mongoose"

const cartItem = mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color",
        required: true
    },
    size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
        required: true
    }
}
)

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cartItems: {
        type: [cartItem],
        default: [true]
    }

})

const cartModel = mongoose.model("Cart", cartSchema)

export default cartModel