import { fetchuser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { TabsList,TabsContent,Tabs,TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { profileTabs } from "@/constants";

async function Page({params}:{params:{id: string}}) {
    const user =await currentUser()

    if(!user) return null;

    const userinfo= await fetchuser(params.id)
    if(!userinfo?.onboarded) redirect("/onboarding")
    console.log(userinfo)

    return(

        <section>
            <ProfileHeader
            accountId={userinfo.id}
            authUserid={user.id}
            name={userinfo.name}
            username={userinfo.username}
            imgUrl={userinfo.image}
            bio={userinfo.bio}
            />
            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {profileTabs.map((tab)=>(
                           <TabsTrigger key={tab.label} value={tab.value}
                           className="tab">
                            <Image
                            src={tab.icon}
                            alt={tab.label}
                            height={24}
                            width={24}
                            />

                            <p className="max-sm:hidden">{tab.label}</p>
                            {tab.label === 'Threads' && (
                                <p className="ml-1 text-light-2 bg-light-4
                                px-2 py-1 !text-tiny-medium rounded-sm">
                                    {userinfo?.Threads?.length}
                                </p>
                            )}
                           </TabsTrigger>
                        ))}
                    </TabsList>
                    
                </Tabs>
            </div>
        </section>
    )

}
export default Page;
