import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 5;
// const ARRAY_LIMIT = 5;

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  completions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Study" }],
  incompletions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Study",
    },
  ],
});

// async function will be call every save hook
userSchema.pre("save", async function () {
  // this === current document(user)

  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
