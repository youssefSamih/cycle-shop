import mongoose, { Schema, Document, Model } from 'mongoose'

interface ProhibitedCombination {
  options: string[]
  condition: string
}

interface ProductInterface extends Document {
  name: string
  basePrice: number
  categoryId: mongoose.Types.ObjectId
  productVariantId?: mongoose.Types.ObjectId
  prohibitedCombinations?: Record<string, ProhibitedCombination>
  calculatePrice(partIds: string[]): Promise<number>
  validateCombinations(selectedOptions: Record<string, string>): boolean
}

const ProductSchema: Schema<ProductInterface> = new Schema(
  {
    name: { type: String, required: true },
    basePrice: { type: Number, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    productVariantId: {
      type: Schema.Types.ObjectId,
      ref: 'ProductVariants',
      required: false
    },
    prohibitedCombinations: {
      type: Map,
      of: new Schema(
        {
          options: { type: [String], required: true },
          condition: { type: String, required: true }
        },
        { _id: false }
      ),
      required: false
    }
  },
  { timestamps: true }
)

// Method to calculate the total price based on selected variants
ProductSchema.methods.calculatePrice = async function (
  partIds: string[]
): Promise<number> {
  const validParts = partIds.filter(
    (partId) => partId && typeof partId === 'string'
  )
  if (validParts.length === 0) return this.basePrice

  const combination = await mongoose
    .model('ProductVariantCombination')
    .findOne({
      partId: { $in: validParts },
      optionId: { $in: validParts }
    })

  let combinationPrice = 0
  let remainingParts = validParts

  if (combination) {
    combinationPrice = combination.price
    remainingParts = validParts.filter(
      (partId) =>
        partId !== combination.partId && partId !== combination.optionId
    )
  }

  const parts = await mongoose
    .model('Part')
    .find({ _id: { $in: remainingParts } })
  if (parts.length !== remainingParts.length)
    throw new Error('One or more selected parts are not found.')

  const remainingPartsPrice = parts.reduce(
    (total, part) => total + part.price,
    0
  )
  return this.basePrice + combinationPrice + remainingPartsPrice
}

// Method to validate prohibited combinations
ProductSchema.methods.validateCombinations = function (
  selectedOptions: Record<string, string>
): boolean {
  if (!selectedOptions || typeof selectedOptions !== 'object')
    throw new Error('Invalid options provided.')
  if (!this.prohibitedCombinations) return true

  return !Array.from(this.prohibitedCombinations.values()).some(
    (combination: ProhibitedCombination) => {
      const { options, condition } = combination

      const conditionMet = Object.values(selectedOptions).includes(condition)
      const optionsIncluded = options.some((optionId) =>
        Object.values(selectedOptions).includes(optionId)
      )

      return conditionMet && optionsIncluded
    }
  )
}

const Product: Model<ProductInterface> = mongoose.model<ProductInterface>(
  'Product',
  ProductSchema
)

export default Product
