import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET); 
    const payload = req.body;
    console.log("🔥 Clerk webhook received");
    const event = whook.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"]
    });

    console.log("✅ Webhook verified");
    const { data, type } = event;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };
        console.log("👤 Creating user:", data.id);
        await User.create(userData);
        console.log("💾 User stored");
        return res.json({ success: true });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        return res.json({ success: true });
      }

      case "user.deleted": {
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