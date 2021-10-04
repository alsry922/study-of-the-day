import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const SALT_ROUNDS = 5;

// async function will be call every save hook
userSchema.pre("save", async function () {
  // this === current document(user)
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
