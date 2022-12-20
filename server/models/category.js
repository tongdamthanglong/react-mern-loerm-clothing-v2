import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    maxLength: 32,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
});
export default mongoose.model("Category", categorySchema);
