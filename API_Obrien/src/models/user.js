import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  {
    name: { type: String, minLength: 6, maxLength: 55, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String },
    role: { type: String, enum: ["admin", "member"], default: "member" },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
