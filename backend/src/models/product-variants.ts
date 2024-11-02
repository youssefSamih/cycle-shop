import mongoose, { Schema, Document, Model } from 'mongoose'

interface ProductVariantsInterface extends Document {
  productId: mongoose.Types.ObjectId
  variantId: string[]
}

const ProductVariantsSchema: Schema<ProductVariantsInterface> = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    variantId: { type: [String], required: true } // assuming variantId contains an array of variant IDs
  },
  { timestamps: false } // No timestamps as specified
)

ProductVariantsSchema.virtual('product', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'productVariantId',
  justOne: true
})

const ProductVariants: Model<ProductVariantsInterface> =
  mongoose.model<ProductVariantsInterface>(
    'ProductVariants',
    ProductVariantsSchema
  )

export default ProductVariants
