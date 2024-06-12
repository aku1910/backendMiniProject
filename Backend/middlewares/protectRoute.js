import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const protectRoute = async (request, response, next) => {
    try {
        const token = request.cookies.jwt;
        if (!token) {
            response.status(401).send({ error: "No token provided - Unauthorized user" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            response.status(401).send({ error: "Invalid token - Unauthorized user" });
        }


        const user = await User.findOne({_id:decode._id});


          if(user){
           request.user=user;
           
           next();
          }


    } catch (error) {
        console.log(`Error in protectRoute middleware: ${error}`);
    }
};

export default protectRoute;
