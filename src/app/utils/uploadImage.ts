import { v2 as cloudinary } from 'cloudinary';
import AppError from '../middlewares/errorSuperClass';
import config from '../config';
import multer from 'multer';
import fs from 'fs';


// Configuration
cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret, // Replace this with your actual API secret
});
export const uploadImageToCloudinary = (path: string, imageName: string) => {

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            path,
            {
                public_id: imageName,
            }, (error, result) => {
                if (error) {
                    return reject(error)
                }
                fs.unlink(path, (err) => {
                    if (err) {
                        console.error('An error occurred:', err);
                    } else {
                        console.log('File deleted successfully!');
                    }
                });
                resolve(result);
            }
        );


    })

};

const storage = multer.diskStorage({


    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/src/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const upload = multer({ storage: storage })