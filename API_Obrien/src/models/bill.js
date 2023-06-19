import mongoose, { Schema } from "mongoose";

const billSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    shippingFee: Number,
    shippingAddress: String,
    totalOrder: Number,
    paymentMethod: String,
    orderNotes: String,
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Delivering", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Bill", billSchema);
