import mongoose from "mongoose"

const colorSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    hex:{
        type:String,
        required:true,
    }
})

const colorModel = mongoose.model("Color",colorSchema)
export default colorModel 