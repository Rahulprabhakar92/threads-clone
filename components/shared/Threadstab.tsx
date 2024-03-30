import { fetchUserposts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

interface props{
    currentuserId:string,
    accountId:string,
    accountType:string
}
const Threadstab= async( {currentuserId,accountId,accountType}:props)=>{
    let result =await fetchUserposts(accountId)
    if(!result) redirect("/")
    return(
        <section className="mt-9 flex flex-col gap-10">
            {result.Threads.map((Thread:any)=>(
                <ThreadCard
                key={Thread._id}
                id={Thread._id}
                currentuserid={currentuserId}
                parentid={Thread.parentid}
                content={Thread.text}
                author={
                    accountType === 'User'
                    ?{name:result.name,image:result.image,id:result.id}:
                    {name:Thread.author.name,image:Thread.author.image,id:Thread.author.id}
                }//update
                Community={Thread.community}
                createdAt={Thread.createdAt}
                comments={Thread.children}
                />
            ))}

        </section>
    )
}
export default Threadstab;