import mongoose, { Schema } from "mongoose";
const cartSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    shippingFee: Number,
    coupon: String,
    totalPrice: Number,
    totalOrder: Number,
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Cart", cartSchema);
