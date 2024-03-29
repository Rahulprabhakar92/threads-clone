"use server"
import { connectToDB } from "../mongoose"
import Thread from "../models/Thread.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import { exec } from "child_process";

interface Params{
    text:string,
    author:string,
    communityid: string | null,
    path:string
}
export async function createThread({ text, author, communityid, path }: Params
    ) {

      try {
        connectToDB();
        const createdThread = await Thread.create({
          text,
          author,
          community: null, // Assign communityId if provided, or leave it null for personal account
        });
        // Update User model
        await User.findByIdAndUpdate(author, {
          $push: { threads: createdThread._id },
        });
        revalidatePath(path);
      } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
      }
    }
export async function fetchPosts(pageNumber=1,pageSize=20){
  connectToDB()
  //to caluclate the number of post to skip on bsics of page nuimber 
  const skipnumber=(pageNumber - 1)*pageSize
   //todo the uiry
  const postsQurey=Thread.find ( { parentid : { $in: [null,undefined] }})
  .sort({createdAt:'desc'})
  .skip(skipnumber)
  .limit(pageSize)
  .populate({path:"author",model:User})
  .populate({path:'children',
   populate:{
    path:"author",
    model:User,
    select:"_id name parentId image"
  }
})

const totalpostcount=await Thread.countDocuments({ parentid : { $in: [null,undefined] }})
const posts = await postsQurey.exec()
const isNext=totalpostcount>skipnumber+posts.length;
return{ posts,isNext }



}

export async function fetchThreadByid(id:string) {
  connectToDB()
  try{
    const thread= await Thread.findById(id)
    .populate({
      path:'author',
      model:User,
      select:"_id id name image"
    })
    .populate({
      path:'children',
      populate:[{
        path:'author',
        model:User,
        select:"_id id name image"
      },
      {
        path:'children',
        model:Thread,
        populate:{
          path:'author',
          model:User,
          select:"_id id name image"
        }
      }
    ]
    }).exec()
    return thread
  }catch(error:any){
     throw new Error (`Error fetching thread ${error.message}`)
  }
  
}