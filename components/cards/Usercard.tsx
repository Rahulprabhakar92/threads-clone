"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
interface props{
    id:string,
    name:string,
    username:string,
    imgUrl:string,
    personType:string
}
const Usercard=({
    id,name,username,imgUrl,personType
}:props)=>{
    const router=useRouter()
return(
    <article className="user-card">
        <div className="user-card_avatar">
            <Image
            src={imgUrl}
            alt="logo"
            width={48}
            height={48}
            className="rounded-full"
            />
            <div className="flex-1 text-ellipsis">
                <h1 className="text-base-semibold text-light-1">{name}</h1>
                <p className="text-small-medium text-gray-1">@{username}</p>
            </div>
           <Button className="user-card_btn" onClick={()=>{
            router.push(`/profile/${id}`)
           }}>View</Button>
        </div>

    </article>
)
}
export default Usercard;