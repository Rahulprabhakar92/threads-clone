
import Link from "next/link";
import Image from "next/image";
import { Organization } from "@clerk/nextjs/server";
import { formatDateString } from "@/lib/utils";
import Like from "../shared/Like";


interface props{
    id:string,
   
    currentuserid:string ,
    parentid:string | null,
    content:string,
    author:{
        name:string,
        image:string,
        id:string
    },
    Community:{
        id:string,
        name:string,
        image:string
    }| null,
    createdAt:string,
    comments:{
        author:{
            image:string
        }
    }[],
    IsComment?:boolean;

}
const ThreadCard=({
    id, 
    currentuserid,
    parentid,
    content,
    author,
    Community,
    createdAt,
    comments,
    IsComment,


}:props)=>{



    return(
        <>
         <article
      className={`flex w-full flex-col rounded-xl ${
        IsComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}>
            <div className="flex items-start justify-between ">
                <div className="flex w-full flex-1 flex-row gap-4 ">

                    <div className="flex flex-col items-center">
                        <Link href={`/profile/${author.id}`} className="reletive h-11 w-11">
                            <Image
                            src={author.image}
                            alt="profile_pic"
                            width={44}
                            height={44}
                            className=" cursor-pointer rounded-full "
                            />
                        </Link>
                        <div className="thread-card_bar"/>
                    </div>

                    <div className="flex w-full flex-col">
                    <Link href={`/profile/${author.id}`} className="w-fit">
                        <h4 className="curser-pointer text-base-semibold text-light-2"> 
                        {author.name}</h4>
                    </Link>
                    <p className="mt-2 text-small-regular text-light-2">
                        {content}
                    </p>
                    <div className={`${IsComment && 'mb-10' } mt-5 flex flex-col gap-3 `}>
                        <div className="flex gap-3.5">

                        <Like  currentuserid={currentuserid}   postid={id}/>
                            
                            <Link href={`/thread/${id}`}>
                            <Image src="/assets/reply.svg"
                            alt="reply"
                            width={24}
                            height={24}
                            className="curser-pointer object-contain"/>
                            </Link>
                            <Image src="/assets/repost.svg"
                            alt="repost"
                            width={24}
                            height={24}
                            className="curser-pointer object-contain"/>
                             <Image src="/assets/share.svg"
                            alt="share"
                            width={24}
                            height={24}
                            className="curser-pointer object-contain"/>
                        </div>
                        {IsComment && comments.length>0 && (
                            <Link href={`/thread/${id}`}>
                                <p className="mt-1 text-subtle-medium text-gray-1">
                                    {comments.length} replies</p>
                            </Link>
                        )}
                    </div>
                    </div>
                </div>

               
            </div>

            {!IsComment && Community && (
                    <Link href={`/communities/${Community.id}`}
                    className="mt-5 flex items-center">
                        <p className="text-subtle-medium text-gray-1">
                            {formatDateString(createdAt)}
                          {" "}  -{Community.name} Community
                        </p>
                        <Image
                        src={Community.image}
                        alt={Community.name}
                        width={14}
                        height={14}
                        className="ml-1 rounded-full object-cover"
                        />
                    </Link>
                )}
              <>
              {comments.length > 0 && (
               <div className="flex items-center mt-2 right-0 relative">
                   {comments.map((member, index) => (
                <Image
                key={index}
                src={member.author.image}
                alt="member_image"
                width={28}
                height={28}
                className={`${
                    index !== 0 && "-ml-2"
                } rounded-full object-cover`}
            />
        ))}
        <p className=" ml-2 text-subtle-medium text-gray-1 ">replies</p>
        {comments.length > 0 && (
            <p className="ml-1 text-gray-1 text-subtle-medium">
                {comments.length}+Users
            </p>
        )}
    </div>
)}</>          
        </article>  </>
    )


}
export default ThreadCard