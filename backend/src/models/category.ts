import mongoose, { Schema, Document, Model } from 'mongoose'

interface CategoryInterface extends Document {
  name: string
}

const CategorySchema: Schema<CategoryInterface> = new Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
)

// Define the one-to-many relationship with Product
CategorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'categoryId',
  justOne: false
})

const Category: Model<CategoryInterface> = mongoose.model<CategoryInterface>(
  'Category',
  CategorySchema
)

export default Category
