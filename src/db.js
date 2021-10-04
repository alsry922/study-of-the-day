import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on("error", (error) => console.log("❌ DB Error", error));
db.once("open", () => console.log("✅ Connected to DB"));
