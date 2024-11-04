import mongoose from "mongoose";

const connectDB = async () => {
  const DB_NAME = "abtaxDB";
  const connectionString =
    "mongodb+srv://kingsaks02:qdgd3M18uIMNuMlR@abtax.c5rxx.mongodb.net/?retryWrites=true&w=majority&appName=abtax";
  // console.log(`${process.env.MONGODB_URI}/${DB_NAME}`)
  try {
    const connectionInstance = await mongoose.connect(
      `${connectionString}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.error("Database Not connected" + err);
    process.exit(1);
  }
};

export default connectDB;
