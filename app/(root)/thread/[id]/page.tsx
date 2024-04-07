import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/Thread.action";
import { fetchuser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


const Page=async({params}:{params:{id:string}})=>{
    if(!params.id) return null;

    const user =await currentUser();
    if(!user ) return null;

    const userinfo=await fetchuser(user.id)
    if(!userinfo?.onboarded) redirect('/onboarding') ;

     const post= await fetchThreadById(params.id)


     return(
    <section className="reletive">
        <div>
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
        </div>
        <div className="mt-7 ">
            <Comment 
            threadId={post.id}
            currentUserimg={userinfo.image}
            userid={userinfo._id}/>
        </div>
        //to display
        <div className="mt-10">
            {post.children.map((childrenitem:any)=>(            
            <ThreadCard
                key={childrenitem._id}
                id={childrenitem._id}
                currentuserid={childrenitem?.id || " "}
                parentid={childrenitem.parentid}
                content={childrenitem.text}
                author={childrenitem.author}
                Community={childrenitem.community}
                createdAt={childrenitem.createdAt}
                comments={childrenitem.children}
                IsComment
                />
            ))}
        </div>
    </section>)
}
export default Page;