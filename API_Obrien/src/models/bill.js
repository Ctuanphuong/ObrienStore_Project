import mongoose, { Schema } from "mongoose";

const billSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    shippingAddress: String,
    shippingFee: Number,
    totalPrice: Number,
    totalOrder: Number,
    paymentMethod: String,
    orderNotes: { type: String, default: "Customer does not write anything." },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
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
