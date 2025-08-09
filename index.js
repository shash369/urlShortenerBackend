import express from "express"
import dotenv from "dotenv";
import urlRoute from "./routes/url.route.js"
import { connectDB } from "./db/index.db.js";
import { URL } from "./models/url.model.js";
dotenv.config({
    path:"./.env"
})
const PORT=process.env.PORT;
const app=express();
app.use(express.json());
connectDB().then(()=>{
    console.log("database is connected");
})

app.use("/api/shorten",urlRoute);// will get sort code

app.get('/:shortcode',async(req,res)=>{   // will get the no of click
        const shortID=req.params.shortcode;
        const org=await URL.findOneAndUpdate({
            shortID
        },{
           $push:{
                visited:{
                    timestamp: Date.now()
                }
           } 
        })
    if (!org) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(org.redirectURL);
})

app.listen(PORT,(req,res)=>{
    console.log("server is at "+PORT);
})


