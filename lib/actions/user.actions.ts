'use server'
import { getJsPageSizeInKb } from "next/dist/build/utils";
import Thread from "../models/Thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import { revalidatePath } from "next/cache";
import { FilterQuery, SortOrder } from "mongoose";
import { ADDRGETNETWORKPARAMS } from "dns";

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
    try {
      connectToDB();
  
      return await User.findOne({ id: userId })
    } catch (error: any) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }
export async function fetchUserposts(userId: string) {
    try {
      connectToDB();
  
      // Find all threads authored by the user with the given userId
      const threads = await User.findOne({ id: userId }).populate({
        path: "Threads",
        model: Thread,
        populate: [
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "name image id", // Select the "name" and "_id" fields from the "User" model
            },
          },
        ],
      });
      return threads;
    } catch (error) {
      console.error("Error fetching user threads:", error);
      throw error;
    }
  }
export async function fetchusers({
     userId,
     searchString="",
     pagenumber=1,
     sortby='desc',
     pagesize=20

} : {
    userId:string,
    searchString:string, 
    pagenumber:number,
    sortby?:SortOrder,
    pagesize:number
}) {
    try{
        const skipamount = (pagenumber - 1 ) * pagesize
        const regex= new RegExp(searchString,"i")

        const query:FilterQuery<typeof User>={
            id:{$ne:userId}
        }

        if(searchString.trim() !== ''){
            query.$or=[
                {username:{$regex:regex}},
                {name:{$regex:regex}}
            ]
        }
        const sortOptions={ createdAt:sortby};
        const userQuery=User.find(query)
        .sort(sortOptions)
        .skip(skipamount)
        .limit(pagesize)

        const totalusercount = await User.countDocuments(query)

        const users=await userQuery.exec()

        const isNext=totalusercount> skipamount+users.length

        return {users,isNext}

    }catch(error:any){
        throw new Error(`the error is of coz of :${error.message}`)
    }
    
}

export async function getActivity(userid:{
    userid:string
}) {
    try{
        connectToDB()
        //find all threads
        const userThreads=await Thread.find({author:userid})
        //collect all the children id
        const childrenThreadIds=userThreads.reduce((acc,userThreads)=>{
            return acc.concat(userThreads.children)
        },[])
        const replies=await Thread.find({
            _id:{$in:childrenThreadIds},
            author:{$ne:userid}
        }).populate({
            path:"author",
            model:User,
            select:"name image _id"
        })

        return replies;
    }catch(error:any){
        throw new Error (`the Eroor form activity ${error.message}`)
    }
    
}