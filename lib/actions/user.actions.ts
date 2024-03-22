'use server'

import { string } from "zod";
import user from "../models/user.model";
import { connectToDB } from "../mongoose"
import { Router } from "next/router";
import { revalidatePath } from "next/cache";

interface params{
    userid:string,
    username:string,
    name:string,
    bio:string,
    image:string,
    path:string,
}
export async function userUpdate({
    userid,
    username,
    name,
    bio,
    image,
    path,
}:params):Promise<void>{
    connectToDB();

   try{
    await user.findByIdAndUpdate(
        {userid:string},
        {
            username:username.toLowerCase(),
            name,
            bio,
            image,
            onboard:true,
        },
        {upsert:true})
        if(path === "profile/edit"){
            revalidatePath(path);

        }
   }catch(error:any){
    console.log(`error is in the ${error}`)

   }
}