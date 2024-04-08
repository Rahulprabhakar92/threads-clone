import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";


async function Rightsidebar (){
    const user =await currentUser()
    if(!user) return null;

    const userinfo= await fetchUser(user.id)
    if(!userinfo?.onboarded) redirect("/onboarding")

    
    const result1=await fetchCommunities({
        searchString:'',
        pageNumber:1,
        pageSize:25,
      })

    const result2=await fetchUsers({
      userId:user.id,
      searchString:'',
      pageNumber:1,
      pageSize:25,
    })
    return(
        <section className="sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-dark-4 bg-dark-2 px-10 pb-6 pt-28 max-xl:hidden
        custom-scrollbar">
    <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-light-1 
        text-heading4-medium 
        ">Suggested Communities</h3>
        {/* <div>
        {result1.communities.map((user:any)=>(
                <h1 className="mt-4 text-light-2 text-heading2-semibold ">@{user?.username}</h1>
            ))}
        </div> */}
       

    </div>
    <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-light-1 
        text-heading4-medium 
        ">Suggested users</h3>
         <div>
        {result2.users.map((user:any)=>(
                <h1 className="mt-4 text-light-2 text-heading2-semibold ">@{user?.username}</h1>
            ))}
        </div>
    </div>
        </section>
        
    )
    }
export default Rightsidebar;