
import ThreadCard from "@/components/cards/ThreadCard"
import Like from "@/components/shared/Like";
import { fetchPosts } from "@/lib/actions/Thread.action"
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";

export default async function Home() {

  const result = await fetchPosts(1,30);
  
  const user=await currentUser()
  if(!user ) return null;


  return (
    <>
    <h1 className="head-text text-left">Home</h1>

    <section className="mt-9 flex flex-col gap-10">
      {result.posts.length === 0 ?(
        <p className="text-center  !text-base-regular text-light-2">No Threads Found</p>
        ):(
          <>
        {result.posts.map((post)=>{
          return (
            
            <ThreadCard
            key={post._id}
            id={post._id}
           
            currentuserid={user?.id || " "}
            parentid={post.parentid}
            content={post.text}
            author={post.author}
            Community={post.community}
            createdAt={post.createdAt}
            comments={post.children}
            />
            )
            
          })}


        </>
      )}

    </section>
    </>

)
}