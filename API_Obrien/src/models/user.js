import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  {
    name: { type: String, minLength: 3, maxLength: 55, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, default: "" },
    avatar: { type: String, default: "" },
    password: { type: String, required: true },
    confirmPassword: { type: String },
    role: { type: String, enum: ["admin", "member"], default: "member" },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    bills: [{ billId: { type: mongoose.Schema.Types.ObjectId, ref: "Bill" } }],
    verifyToken: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
