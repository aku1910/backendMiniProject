import mongoose from "mongoose";
const orderItem = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
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
        required: true,
        ref: "Color"
    },

    size:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Size"
    },
    status: {
        type: String,
        enum: ['Pending', 'Processed', 'Shipped', 'Delivered'],
        default: "Pending"
    },
    shippingAddress: {
        streetAddress: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
    }
})
const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderItems: [orderItem]

},
    { timestamps: true })

export default mongoose.model("Order", orderSchema)
