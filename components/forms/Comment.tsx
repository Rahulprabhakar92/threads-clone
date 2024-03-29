"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommentValidation } from "@/lib/validations/threadvalidation";
import Image from "next/image";
import { addcommenttoThread } from "@/lib/actions/Thread.action";
    // import { createThread } from "@/lib/actions/Thread.action";

interface props{
    threadId:string,
    currentUserimg:string,
    userid:string
}
const Comment=({threadId,currentUserimg,userid}:props)=>{
    const router = useRouter();
  const pathname = usePathname();

    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
          thread: ""
        },
      });

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addcommenttoThread(
            threadId,values.thread,userid,pathname)
            form.reset()
      };
    
    return(
        <Form {...form}>
        <form
          className=' mt-10 flex items-center gap-4 border-y border-y-dark-4 py-4 max-xs:flex-col '
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='thread'
            render={({ field }) => (
              <FormItem className='flex w-full items-center gap-3'>
                <FormLabel >

                    <Image 
                    src={currentUserimg}
                    alt="profile_image"
                    className="rounded-full object-cover"
                    width={45}
                    height={45}/>
                </FormLabel>
                <FormControl className='no-focus bg-transparent  border-none'>
                  <Input type="text"
                  placeholder="Comment"
                  className="text-light-1 no-focus outline-none"
                   {...field} />
                </FormControl>
              </FormItem>
            )}
          />
  
          <Button type='submit' className='rounded-3xl bg-primary-500 px-8 py-2 !text-small-regular text-light-1 max-xs:w-full'>Reply</Button>
        </form>
      </Form>
    )}
export default Comment;