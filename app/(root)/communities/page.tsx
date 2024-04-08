import {  fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Communitycard from "@/components/cards/Usercard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "@/components/cards/Communitycard";
const page = async() => {
  
    const user =await currentUser()
    if(!user) return null;

    const userinfo= await fetchUser(user.id)
    if(!userinfo?.onboarded) redirect("/onboarding")

    const result=await fetchCommunities({
      searchString:'',
      pageNumber:1,
      pageSize:25,
    })

  return (
   <section>
    <h1 className="head-text mb-10"> Search</h1>

    <div className="mt-14 flex flex-col gap-9">
      {result.communities.length === 0 ? (
        <p className="no-result">NO Communities</p>
      ):(
        <> 
        {result.communities.map((communitys)=>(
          <CommunityCard
          key={communitys.id}
          id={communitys.id}
          name={communitys.name}
          username={communitys.name}
          imgUrl={communitys.image}
          members={communitys.members}
          bio={communitys.member}

          />
        ))}
        </>
      )}

    </div>

   </section>
  )
}

export default page