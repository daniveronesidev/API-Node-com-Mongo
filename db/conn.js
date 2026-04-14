import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect("mongodb+srv://daniveronesi:456123@cluster0.hnz7mxz.mongodb.net/petshop");
        console.log("Conectado ao MongoDB");
    } catch (error) {
        console.error(error);
    }
}