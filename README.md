# MERN_Dashboard

Tech stack & packages used for backend development - 
- NodeJS
- ExpressJS
- Cors
- MongoDB & Mongoose
- Bcrypt & JWT 
- Cloudinary & Multer 

For Frontend development - 
- NextJS
- React-Icons
- Axios 
- TailwindCSS 

For the deployment - 
- Vercel for frontend deployment
- AWS for backend deployment (using Nginx, EC2, and PM2)

Briefing of the project:-

Backend :- I used the ExpressJS framework of NodeJS for the backend CRUD requests, the Mongoose framework of MongoDB for data storage, and Cloudinary for file storage.
Multer helps us handle the file from the front end and upload it on Cloudinary or S3. To make authentication easy and secure I used JWT for token and bcrypt for hash password. The reason for using CORS is that it helps with same-origin policy and unwanted issues.

Frontend :- I used normal useState for handling and storing the data. I can use redux but redux is usually used for large projects and using normal state management was easy and less time taking. Fetching the data from the AWS server and storing it in the state with secure authentication of data for the login and register process. I do use tailwind for a better UI experience and for easy to use. 
