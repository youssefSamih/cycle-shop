import mongoose, { Schema, Document, Model } from 'mongoose'

export interface VariantInterface extends Document {
  name: string
  type: string
  price: number
  stock: boolean
}

const VariantSchema: Schema<VariantInterface> = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., 'frameType', 'wheels', 'chain', etc.
    price: { type: Number, required: true }, // Price of the part
    stock: { type: Boolean, required: true } // Quantity in stock
  },
  { timestamps: true }
)

// Virtual to define many-to-many relationship with Product
VariantSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'variantId', // assuming Product model has a field for parts
  justOne: false
})

const Variant: Model<VariantInterface> = mongoose.model<VariantInterface>(
  'Variant',
  VariantSchema
)

export default Variant
