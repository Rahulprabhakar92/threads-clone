import Image from "next/image";
import { communityTabs } from "@/constants";
import { currentUser } from "@clerk/nextjs";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThreadsTab from "@/components/shared/Threadstab";



import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import Usercard from "@/components/cards/Usercard";


async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const communitydetails = await fetchCommunityDetails(params.id)


  return (
    <section>
      
      <ProfileHeader
        accountId={communitydetails.id}
        authUserid={user.id}
        name={communitydetails.name}
        username={communitydetails.username}
        imgUrl={communitydetails.image}
        bio={communitydetails.bio}
        type="Community"
      />

      <div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            {communityTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === "Threads" && (
              <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                {communitydetails?.threads?.length}
              </p>
            )}
          </TabsTrigger>
        ))}
      </TabsList>


        <TabsContent
          value="threads"
          className='w-full text-light-1'
        >
          <ThreadsTab
          currentUserId={user.id}
           accountId={communitydetails._id}
           accountType="Community"
          />
        </TabsContent>

        <TabsContent
          value="members"
          className='w-full text-light-1'
        >
        <section className="mt-9 flex flex-col gap-10">
            {communitydetails?.members.map((memeber:any)=>(
                <Usercard
                key={memeber.id}
                id={memeber.id}
                name={memeber.name}
                imgUrl={memeber.image}
                username={memeber.username}
                personType="User"
                />
            ))}
        </section>

        </TabsContent>

        <TabsContent
          value={"requests"}
          className='w-full text-light-1'
        >
          <ThreadsTab
          currentUserId={user.id}
           accountId={communitydetails._id}
           accountType="Community"
          />

        </TabsContent>

    </Tabs>
  </div>
</section>
);
}
export default Page;