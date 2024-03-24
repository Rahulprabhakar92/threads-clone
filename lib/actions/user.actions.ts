'use server'
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import { revalidatePath } from "next/cache";

interface params{
    userId:string,
    username:string,
    name:string,
    bio:string,
    image:string,
    path:string,
}
export async function userUpdate({
    userId,
    username,
    name,
    bio,
    image,
    path,
}:params):Promise<void>{
    connectToDB();

   try{
    await User.findOneAndUpdate(
        { id: userId },
        {
            username:username.toLowerCase(),
            name,
            bio,
            image,
            onboarded:true,
        },
        {upsert:true})

        if(path === "profile/edit"){
            revalidatePath(path);

        }
   }catch(error:any){
    console.log(`error is in the ${error}`)

   }
}

export async function fetchuser(userId: string) {
   try{
    connectToDB();

    return await User.findOne({id:userId})

   }catch(error:any){
    throw new Error(`this is the new error: ${error.message}`)

   }   
}