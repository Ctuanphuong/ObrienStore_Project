import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema(
  {
    name: { type: String, minLength: 3, trim: true, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, minLength: 10, trim: true, required: true },
    images: [
      {
        type: Object,
        required: true,
      },
    ],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    // coupon: String,
    // rating: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

productSchema.index({ name: "text" });
productSchema.plugin(paginate);
export default mongoose.model("Product", productSchema);
