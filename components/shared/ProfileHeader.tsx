import Image from "next/image"
interface props{
    accountId:string,
    authUserid:string,
    name:string,
    username:string,
    imgUrl:string,
    bio:string,
    type?:'User' | 'Community'
}
const ProfileHeader=({
    accountId,
    authUserid,
    name,
    username,
    imgUrl,
    bio,
    type
}:props)=>{
    return(
        <div className="flex flex-col w-full justify-start">
            <div className="flex items-center justify-betwen">
                <div className="flex items-center gap-3">
                    <div className="relative object-cover h-20 w-20">
                       <Image
                       src={imgUrl}
                       className="rounded-full object-cover shadow-2xl"
                       fill
                       alt="profile_pic"
                       />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-heading3-bold text-left
                        text-light-1">{name}</h2>
                        <p className="text-base-medium text-gray-1">@{username}</p>
                    </div>
                </div>
            </div>
            <p className="mt-6 max-w-lg text-light-2 text-base-regular">{bio}</p>
            <div className="mt-12 h-0.5 w-full bg-dark-3" />
        </div>
    )
}
export default ProfileHeader;