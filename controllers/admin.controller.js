import { URL } from "../models/url.model.js";

export async function loginAdmin(req, res) {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false, message: "Unauthorized" });
}

export async function getAllUrls(req, res) {
  const urls = await URL.find({});

  const result = urls.map((url) => ({
    id: url.shortID,
    redirectURL: url.redirectURL,
    totalClicks: url.visited.length,
  }));

  return res.json(result);
}
