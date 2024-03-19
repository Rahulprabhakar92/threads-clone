import mongoose from 'mongoose'

let isconnected=true;

export const connectToDB=async()=>{
    mongoose.set('strictQuery',true);

    if(!process.env.MONGODB_URL) return console.log('the key not exisrt')
    if(isconnected) return console.log("mongodb connected")

    try{
        await mongoose.connect(process.env.MONGODB_URL);

        isconnected=true
    }catch(error){
        console.log(error)

    }
}