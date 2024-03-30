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
    export async function fetchPosts(pageNumber = 1, pageSize = 20) {
      connectToDB();
    

      const skipAmount = (pageNumber - 1) * pageSize;
    

      const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
        .sort({ createdAt: "desc" })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({
          path: "author",
          model: User,
        })
        .populate({
          path: "children", 
          populate: {
            path: "author", 
            model: User,
            select: "_id name parentId image", 
          },
        });
    
    
      const totalPostsCount = await Thread.countDocuments({
        parentId: { $in: [null, undefined] },
      }); 
      console.log(totalPostsCount+"this is the fetchpost action")
    
      const posts = await postsQuery.exec();

      const isNext = totalPostsCount > skipAmount + posts.length;
      return { posts, isNext };
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

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();

  try {
    // Find the original thread by its ID
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    // Create the new comment thread
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId, 
    });


    const savedCommentThread = await commentThread.save();


    originalThread.children.push(savedCommentThread._id);


    await originalThread.save();

    revalidatePath(path);
  } catch (err) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
  
}