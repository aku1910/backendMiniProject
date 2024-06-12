import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product"
  },
  rating: {
    type: Number,
    required:true
  },
  comment: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const ReviewModel = mongoose.model("Review", reviewSchema); // Model adı "Review" olarak değiştirildi

export default ReviewModel; // Model doğru şekilde export ediliyor
