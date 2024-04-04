import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { currentUser } from "@clerk/nextjs";
const f = createUploadthing();


const getuser = async ()=>await currentUser()
 

export const ourFileRouter = {
  
  media:f({ image: { maxFileSize: "4MB",  maxFileCount:1} })
  
    .middleware(async ({ req }) => {

      const user = await getuser()
    
      
      if (!user) throw new UploadThingError("Unauthorized");
 

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {

      console.log("Upload complete for userId:", metadata.userId);
 
      console.log("file url", file.url);
      

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;