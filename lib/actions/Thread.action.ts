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

        await User.findByIdAndUpdate(author, {
          $push: { Threads: createdThread._id },
        });
  
      revalidatePath(path);
    } catch (error: any) {
      throw new Error(`Failed to create thread: ${error.message}`);
    }
  }
  export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();
  
    // Calculate the number of posts to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;
  
    // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
      })
      
      .populate({
        path: "children", // Populate the children field
        populate: {
          path: "author", // Populate the author field within children
          model: User,
          select: "_id name parentId image", // Select only _id and username fields of the author
        },
      });
       // Count the total number of top-level posts (threads) i.e., threads that are not comments.
  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  }); // Get the total count of posts

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