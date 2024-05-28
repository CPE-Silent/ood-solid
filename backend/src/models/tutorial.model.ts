import mongoose from "mongoose";

export interface ITutorial extends Document {
  title: string;
  description: string;
  published: boolean;
}

const tutorialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  published: { type: Boolean, required: true },
});

const Tutorial = mongoose.model<ITutorial>("Tutorial", tutorialSchema);
export default Tutorial;