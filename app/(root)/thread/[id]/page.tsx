import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreadByid } from "@/lib/actions/Thread.action";
import { fetchuser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page=async({params}:{params:{id:string}})=>{
    if(!params.id) return null;

    const user =await currentUser();
    if(!user ) return null;

    const userinfo=await fetchuser(user.id)
    if(!userinfo?.onboarded) redirect('/onboarding') ;

     const post= await fetchThreadByid(params.id)


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

    </section>)
}
export default Page;