'use client'
import {useForm } from "react-hook-form"
import Image from "next/image"
import * as z from 'zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { zodResolver} from "@hookform/resolvers/zod"
import { userValidation } from "@/lib/validations/user";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChangeEvent, useState } from "react"
import { Textarea } from "../ui/textarea"
import { isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing"

interface Props{
    user:{
        id:string;
        objectId:string;
        username: string;
        name:string;
        bio:string;
        image:string;
    };
    btnTitle:string;
}


 function AccountProfile({user,btnTitle}:Props){
  const[files,setfiles]=useState<File[]>([])

  const { startUpload  }= useUploadThing("media")

    const form =useForm({
        resolver:zodResolver(userValidation),
        defaultValues:{
            profile_photo:user?.image || "",
            name:user.name||"",
            username:user.username||"",
            bio:user.bio||""
        }

    })
    
    function handleimage(e:ChangeEvent<HTMLInputElement>,fieldchange:(value:string)=>void){
        e.preventDefault()

        const filereader=new FileReader()

        if(e.target.files && e.target.files.length>0){
          const file=e.target.files[0]

          setfiles(Array.from(e.target.files))

          if(!file.type.includes('image')) return;

          filereader.onload=async(event)=>{
            const imageDataurl=event.target?.result?.toString() || " "

            fieldchange(imageDataurl)
          }
          filereader.readAsDataURL(file)
        }
    }
    const onSubmit=async (values: z.infer<typeof userValidation>)=> {
        const blob=values.profile_photo;

        const hasImagechanged=isBase64Image(blob)

        if(hasImagechanged){
          const imgRes=await startUpload(files)
          console.log(imgRes)

          if(imgRes && imgRes[0].url){
            values.profile_photo = imgRes[0].url
          }
        } 
        //todo create a backend  
      }

    return(
<Form {...form}>
      <form 
      onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col justify-start gap-10">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex flex-center gap-4 ">
              <FormLabel className="account-form_image-label ">
                {field.value?(

                <Image 
                src={field.value}
                alt="Profile_photo"
                priority
                className='rounded-full object-contain'
                width={96}
                height={96}/>
            ): (

            <Image 
            src="/assets/profile.svg"
            alt="Profile_photo"
            width={24}
            height={24}/>
            )}
              </FormLabel>
              
              <FormControl className="flex-1 text-base-semibold text-gray-500 ">
                <Input 
                type='file'
                accept="image/*"
                placeholder="image uploade"
                className="account-form_image-input "
                onChange={(e)=>{handleimage(e,field.onChange)}}/>
              </FormControl>
             

            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex gap-3 w-full flex-col">
              <FormLabel className="text-base-semibold text-light-1 mt-5">
                Name
              </FormLabel>
              <FormControl >
                <Input 
                type='input'
                {...field}
                className="account-form_input "/>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex gap-3 flex-col">
              <FormLabel className="text-base-semibold text-light-1 mt-5">
                UserName
              </FormLabel>
              <FormControl >
                <Input 
                type='input'

                {...field}
                className="account-form_input "/>
              </FormControl>
             

            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex    gap-3 flex-col">
              <FormLabel className="text-base-semibold text-light-1 mt-5 ">
                Bio
              </FormLabel>
              <FormControl >
                <Textarea
                rows={10}
                {...field}
                className="account-form_input no-focus "/>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500 ">Submit</Button>
      </form>
    </Form>
    )
}
export default AccountProfile;
