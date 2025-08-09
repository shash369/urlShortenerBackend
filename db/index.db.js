import mongoose  from "mongoose";
import { DB_NAME } from "../constants.js";

async function connectDB(){
   try {
        const connection =await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log("successfull connection");
        // console.log(connection);
   } catch (error) {
      console.log("failed to connect ::" +error);
    process.exit(1);
   }
}

export {connectDB};