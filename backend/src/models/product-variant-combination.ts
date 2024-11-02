import mongoose, { Schema, Document, Model } from 'mongoose'

interface ProductVariantCombinationInterface extends Document {
  variantId: mongoose.Types.ObjectId
  optionId: mongoose.Types.ObjectId
  price: number
}

const ProductVariantCombinationSchema: Schema<ProductVariantCombinationInterface> =
  new Schema(
    {
      variantId: {
        type: Schema.Types.ObjectId,
        ref: 'Variant',
        required: true
      }, // Reference to the main variant
      optionId: { type: Schema.Types.ObjectId, ref: 'Variant', required: true }, // Reference to the option variant
      price: { type: Number, required: true } // Special price for this combination
    },
    { timestamps: true } // Includes createdAt and updatedAt fields
  )

const ProductVariantCombination: Model<ProductVariantCombinationInterface> =
  mongoose.model<ProductVariantCombinationInterface>(
    'ProductVariantCombination',
    ProductVariantCombinationSchema
  )

export default ProductVariantCombination
