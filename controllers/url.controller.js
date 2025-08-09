import { nanoid } from "nanoid";
import { URL } from "../models/url.model.js";


async function handleNewShortURL (req,res) {
    const body=req.body;
    if(!body.url)return res.status(400).json({
        error:"no url is provided"
    });
    
    const shortID=nanoid(8);
    console.log(shortID);
    await URL.create({
       shortID:shortID,
       redirectURL:body.url,
       visited:[]
    })

    return res.json({
        id:shortID,
        reD:body.url
    });
}

async function getClicks(req, res) {
    try {
        const shortID = req.params.shortcode;
        const ans = await URL.findOne({ shortID });

        if (!ans) {
            return res.status(404).json({ error: "No short URL matched" });
        }

        return res.json({
            totalClicks: ans.visited.length,
            analytics:ans.visited
        });
    } catch (err) {
        console.error("Error in getClicks:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export {handleNewShortURL,getClicks};