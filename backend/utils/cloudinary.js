// import fs from 'fs';

// import dotenv from 'dotenv'

//  dotenv.config({
//     path: "./.env"
//  })
// import {v2 as cloudinary } from 'cloudinary'


// cloudinary.config({
//     cloud_name:process.env.CLOUD_NAME,
//     api_key:process.env.API_KEY,
//     api_secret:process.env.API_SECRET_KEY
// })

// const UploadCloudinary = async(localFilePath) => {


//     try {
//         if(!localFilePath) return null
//         const response = await cloudinary.uploader.upload(localFilePath,{
//             resource_type:"auto"
//         })
//          console.log("File Uploaded To Cloudinary:", response.url);

//          fs.unlinkSync(localFilePath)

//          return response
//     } catch (error) {
//         fs.unlinkSync(localFilePath)
//         return null
//     }
 
// }
// export {UploadCloudinary}
import fs from 'fs';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config({ path: "./.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY
});

const UploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File Uploaded To Cloudinary:", response.secure_url);

    // ✅ local file delete after upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export { UploadCloudinary };
