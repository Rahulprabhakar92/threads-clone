import { fetchuser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { getActivity } from "@/lib/actions/user.actions";
import Link from "next/link";
import Image from "next/image";
import { Children } from "react";

async function Page() {
    const user =await currentUser()
    if(!user) return null;

    const userinfo= await fetchuser(user.id)
    if(!userinfo?.onboarded) redirect("/onboarding")
    const Activity= await getActivity(userinfo._id)

    return(
  <section>
    <h1 className="head-text  mb-10">Activity</h1>
    <section className="mt-10 flex flex-col gap-5">
      {Activity.length > 0 ? (
        <>
        {Activity.map((activity)=>(
          <Link key={activity._id} href={`/thread/${activity.parentId}`}>
            <article className="activity-card">
              <Image
              src={activity.author.image}
              alt="profile_pic"
              width={30}
              height={30}
              className="rounded-full object-cover" 
              />
             <p className="!text-small-regular text-light-1">
              <span className="mr-1 text-primary-500">
                @{activity.author.name}
              </span>{" "}
              replied To ur comment
             </p>
             
            </article>
          </Link>
        ))}
        </>
      ):<p>No Activity</p>}
    </section>
  </section>
  )

}
export default Page;