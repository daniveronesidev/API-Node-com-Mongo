import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    name: String,
    age: Number,
    weight: Number,
    available: Boolean,
});

export default mongoose.model("Pet", petSchema);