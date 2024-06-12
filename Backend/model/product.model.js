import mongoose from "mongoose"

export const stockItem = mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
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
    },
})

export const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },

    productPic: {
        type: String,
        required: true,
    },

    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Review"
        }
    ],
    stock: [stockItem]
})

export const product = {
    title: "Andrew Tate T-shirt",
    price: 10,
    category: "T-shirt",
    slug: "andre-tate-t-shirt",
    reviews: [],
    colors: [],
    size: [],
    stock: [{ color: "red", size: "m", quantity: 10 },
    { color: "black", size: "xs", quantity: 10 }
    ]

}

const productModel = mongoose.model("Product", productSchema)

export default productModel
