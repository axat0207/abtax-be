import mongoose from 'mongoose';

const connectDB = async ()=>{
    const DB_NAME = 'abtaxDB'
    console.log(`${process.env.MONGODB_URI}/${DB_NAME}`)
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://axxatagrawal:XjlW8XggzZ7jUfBi@cluster0.wir5xrk.mongodb.net/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

    }catch(err){
        console.error("Database Not connected" + err);
        process.exit(1);
    }
}

export default connectDB;