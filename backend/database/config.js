import mongoose from "mongoose";

export default async function(connectionString){
    mongoose.set('strictQuery', false)
    await mongoose.connect(connectionString)
}

export async function disconnect(){
    await mongoose.disconnect()
}