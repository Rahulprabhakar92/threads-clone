import mongoose from 'mongoose'

let IsConnected=false;

export const connectToDB=async()=>{
    mongoose.set('strictQuery',true)

    if(!process.env.MONGODB_URL) return console.log('the mongo url does not exist')

    if(IsConnected) return console.log('connected to mongodb')

    try{
        await mongoose.connect(process.env.MONGODB_URL)
        IsConnected=true

    }catch(error){
        console.log(`the error is ${error}`)
    }
}