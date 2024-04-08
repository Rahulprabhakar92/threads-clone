import {  fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Usercard from "@/components/cards/Usercard";
import { Input } from "@/components/ui/input";
import Search from "@/components/shared/Search";
const page = async() => {
  
    const user =await currentUser()
    if(!user) return null;

    const userinfo= await fetchUser(user.id)
    if(!userinfo?.onboarded) redirect("/onboarding")

    const result=await fetchUsers({
      userId:user.id,
      searchString:'',
      pageNumber:1,
      pageSize:25,
    })

  return (
    <article>

      <h1 className="head-text mb-10"> Search</h1>
      <div>
      <Search
      routerType="search"
      />

      </div>
      
      <div className="mt-14 flex flex-col gap-9">
      {result.users.length === 0 ?(
        <p className="no-result">no users</p>
      ):(
        <>
        {result.users.map((person)=>(
          <Usercard
          key={person.id}
          id={person.id}
          name={person.name}
          username={person.name}
          imgUrl={person.image}
          personType='User'
          />
        ))}
        </>
      )}
      </div>
    
    </article>
  )
}

export default page