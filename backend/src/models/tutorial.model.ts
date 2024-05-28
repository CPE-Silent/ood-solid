import mongoose, { Document, Schema } from 'mongoose';

export interface ITutorial extends Document {
  title: string;
  description: string;
  published: boolean;
}

const tutorialSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Adding the toJSON method
tutorialSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const TutorialModel = mongoose.model<ITutorial>(
  'Tutorial',
  tutorialSchema,
  'Tutorials'
);
