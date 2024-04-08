import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

async function Page() {
    const user= await currentUser();
    if(!user) return null;

    const userinfo=await fetchUser(user.id)

    if(userinfo?.onboarded) redirect('/')

    const userdata={
        id:user?.id ,
        objectId:userinfo?._id,
        username:userinfo ? userinfo?.username :user?.username,
        name:userinfo ? userinfo?.name :user?.firstName,
        bio:userinfo ? userinfo?.bio : "",
        image:userinfo ? userinfo?.image :user?.imageUrl,



    }
    return(
        <main className="flex justify-start mt-10 flex-col px-10 py-20 max-w-3xl mx-auto">
            <h1 className="head-text">OnBoarding</h1>
             <p className="text-light-1
             mt-5 text-base-regular">Welcome to onBoarding create your account..</p>

             <section className="mt-5 p-10 bg-dark-2">
                <AccountProfile 
                user={userdata} 
                btnTitle="Continue" />

             </section>
        </main>
    )   
}
export default Page; 