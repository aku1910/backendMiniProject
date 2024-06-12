import Review from "../model/review.model.js"

export const getSpesificReviews = async (request, response) => { 
   const {productId} = request.params
   const spesificReviews = await  Review.find({productId})

   if(!spesificReviews){
    return response.status(400).send({error:"something went wrong"})
   }
     
   response.status(200).send(spesificReviews)
}

export const getReviews = async (request, response) => {
    const reviews = await Review.find()

    if (!reviews) {
        return response.status(404).send({ error: "Something went wrong" })
    }
    response.status(200).send(reviews)

}

export const addReview = async (request, response) => {
    const { _id: userId } = request.user
    const { rating, comment , productId} = request.body
    
    console.log(userId);
    if (!rating || !comment || !productId) {
        return response.status(400).send({ error: "please filled up all fields" })
    }


    const newReview = await Review.create({
        userId,
        productId,
        rating,
        comment
    })

    if (!newReview) {
        return response.status(404).send({ error: "Review not created" })
    }

    response.status(291).send(newReview)
}
