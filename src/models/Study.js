import mongoose, { mongo } from "mongoose";

const studySchema = mongoose.Schema({
  title: { type: String, require: true },
  level: { type: Number, required: true },
  volume: { type: Number, required: true },
  finishTime: { type: Number },
  finished: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Study = mongoose.model("Study", studySchema);

export default Study;
