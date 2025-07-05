import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";




    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: CLOUD_API_SECRET 
       });
    
     const uploadONCloudinary = async(localFilePath)=>{
      try {
            if(!localFilePath){
               return null;
            }
            const response = await cloudinary.uploader.upload(localFilePath,{
                  resource_type:"auto"
            })
            console.log("File is uploaded successfully on cloudinary",response.url);
            return response;
      }
      catch(error){
            fs.unlinkSync(localFilePath);
            console.log("error on file upload on cloudinary", error);
            return null;

      }
     } 

     export default uploadONCloudinary;
   