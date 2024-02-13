import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: 'dhw31jiof', 
  api_key: '324693876994192', 
  api_secret: 'jeZ3fD-FTIG3Vf15-pvkKXelSY4'
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        
        if (!localFilePath) return null
        
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        
        return response;

    } catch (error) {
        console.log(error)
        fs.unlinkSync(localFilePath) 
        return null;
    }   
}



export default uploadOnCloudinary;