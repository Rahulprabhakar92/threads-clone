"use server"
import { connectToDB } from "../mongoose"
import Thread from "../models/Thread.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

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