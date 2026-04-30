import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  console.log("🔥 WEBHOOK HIT");
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET); 
    const payload = req.body;
    console.log("🔐 VERIFYING WEBHOOK...");
    const event = whook.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"]
    });
    console.log("✅ VERIFIED SUCCESSFULLY");
    const { data, type } = event;

    switch (type) {
      case "user.created": {
        console.log("TYPE:", type);
        console.log("DATA:", data);
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };

        await User.create(userData);
        console.log("💾 USER CREATED IN DB");
        return res.json({ success: true });
      }

      case "user.updated": {
        console.log("TYPE:", type);
        console.log("DATA:", data);
        const userData = {
          email: data.email_addresses?.[0]?.email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        return res.json({ success: true });
      }

      case "user.deleted": {
        console.log("TYPE:", type);
        console.log("DATA:", data);
        await User.findByIdAndDelete(data.id);
        return res.json({ success: true });
      }

      default:
        return res.json({ success: true });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Webhook error" });
  }
};