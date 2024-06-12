import mongoose from "mongoose"



const sizeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ["xs", "s", "m", "l", "xl", "xxl", "3xl"]
    },

})

const sizeModel = mongoose.model("Size", sizeSchema)
export default sizeModel 