import cloudinary from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'durzzjrom', 
  api_key: '618192574439767', 
  api_secret: process.env.CLOUDINARY_PASSWORD
});