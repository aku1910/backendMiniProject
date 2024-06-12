import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import multer from "multer"

import AuthRoute from "./routes/auth.routes.js"
import ProductRoute from "./routes/product.routes.js"
import CartRoute from "./routes/cart.routes.js"
import ColorRoute from "./routes/color.routes.js"
import ReviewRoute from "./routes/review.routes.js"
import SizeRoute from "./routes/size.routes.js"
import OrderRoute from "./routes/order.routes.js"
import CategoryRoute from "./routes/category.routes.js"

const app = express()

dotenv.config()


const PORT = process.env.PORT || 9000
const MONGODB_URL = process.env.MONGODB_URL


const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, "./image")
    },
    filename: function (request, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage: storage })


app.use(cookieParser())
app.use(express.static("./"))
app.use(express.json())

app.use("/api/auth", AuthRoute)
app.use("/api/cart", CartRoute)
app.use("/api/color", ColorRoute)
app.use("/api/sizes", SizeRoute)
app.use("/api/product", upload.single("productPic"), ProductRoute)
app.use("/api/review", ReviewRoute)
app.use("/api/order", OrderRoute)
app.use("/api/categories", CategoryRoute)




app.listen(PORT, () => {
    mongoose
        .connect(MONGODB_URL)
        .then(() => {
            console.log(`Database connected and server is listening or ${PORT}`);
        })
        .catch((error) => {
            console.log(error);
        })


})
