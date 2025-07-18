import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async()=>{
      try {
           const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)
           console.log(`\n MongoDb connected !! DB_Host :${connectionInstance.connection.host}`);
      } catch (error) {
            console.log("MongoDb connection error" ,error);
            process.exit(1);
      }
}
export default connectDb;     


