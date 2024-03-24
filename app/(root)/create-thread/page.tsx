import { fetchuser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import PostThread from "@/components/forms/PostThread";

async function Page() {
    const user =await currentUser()

    if(!user) return null;

    const userinfo= await fetchuser(user.id)
    console.log(userinfo.id)

    if(!userinfo?.onboarded) redirect("/onboarding")

    return (
        <>
        <h1 className="head-text">Create Thread</h1>
        <PostThread userId={userinfo._id}/> 
        </> 
    )

}
export default Page