import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  movieId: { type: String, required: true },
  userId: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true },
});

export default model("Review", reviewSchema);
