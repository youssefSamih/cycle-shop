import { Request, Response } from 'express'

import Variant, { VariantInterface } from '../models/variant'
import ProductVariantCombination from '../models/product-variant-combination'

interface SelectedOptionsType {
  condition: string
  price: string
}

// Fetch Parts
const fetchVariants = async () => {
  try {
    const variants = await Variant.find({}, 'id name type price stock') // Select specific fields

    if (!variants || variants.length === 0) {
      return { message: 'No variants available in stock.' }
    }

    return variants
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching variants')
  }
}

const listVariants = async (_: Request, res: Response) => {
  try {
    const variants = await fetchVariants()

    res.status(201).json(variants)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Unable to fetch variants.' })
  }
}

const createVariant = async (data: VariantInterface) => {
  try {
    return await Variant.create(data) // `create` can be used directly with Mongoose as a shortcut for saving a new document
  } catch (error) {
    console.error(error)
    throw new Error('Error creating variant')
  }
}

const addVariantOptionCombinations = async (
  partId: string,
  selectedOptions: Record<string, SelectedOptionsType>
) => {
  try {
    if (!selectedOptions || !partId) throw new Error('Invalid input')

    const formatPrice = (price: string) => parseFloat(price.replace(/,/g, ''))

    // Prepare records to insert
    const records = Object.entries(selectedOptions).map(
      ([key, { condition, price }]) => ({
        partId,
        optionId: condition,
        price: formatPrice(price)
      })
    )

    // Insert multiple records to PartOptionCombination collection
    await ProductVariantCombination.insertMany(records)

    console.log('Variant option combinations added successfully')
  } catch (error) {
    console.error('Error adding variant option combinations:', error)
    throw new Error('Error adding variant option combinations')
  }
}

const newVariant = async (req: Request, res: Response) => {
  try {
    const variantData = {
      name: req.body.partName,
      price: req.body.basePrice,
      type: req.body.type,
      stock: true
    }

    const { _id } = await createVariant(variantData)

    const response = await addVariantOptionCombinations(
      _id,
      req.body.combinations
    )

    res.status(201).json({ response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Unable to add part.' })
  }
}

export { listVariants, newVariant }
