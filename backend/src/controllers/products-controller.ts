import { Types } from 'mongoose'
import { Request, Response } from 'express'

import Product from '../models/Product'
import Variant from '../models/variant'
import ProductVariants from '../models/product-variants'

const fetchProducts = async () => {
  try {
    const products = await Product.find({})
      .populate({
        path: 'category',
        select: 'name' // Selecting only the `name` field from Category
      })
      .populate({
        path: 'ProductVariants',
        select: 'productVariantsId' // Selecting only the `partsId` field from ProductParts
      })
      .sort({ createdAt: -1 }) // Sorting by `createdAt` in descending order

    return products
  } catch (error) {
    console.error(error)
    throw new Error('Unable to find products.')
  }
}

const transformProductData = async (products: any[]) => {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error('Invalid or empty products input')
  }

  // Transform product data and extract part IDs
  const productData = products.map((product) => {
    const productParts = product.productParts
      .map((part: any) => JSON.parse(part.partsId))
      .flat()
    return {
      id: product._id,
      name: product.name,
      basePrice: product.basePrice,
      categoryId: product.categoryId,
      productParts,
      prohibitedCombinations: product.prohibitedCombinations
    }
  })

  // Collect all part IDs from product variants
  const allProductPartIds = productData.flatMap((product) =>
    product.productParts.map((part: any) => part.id)
  )

  if (allProductPartIds.length === 0) {
    return productData
  }

  try {
    // Fetch variants based on IDs
    const variants = await Variant.find(
      { _id: { $in: allProductPartIds } },
      'id name type price stock' // Select only the required fields
    )

    // Create a map of variants by ID for easy lookup
    const partsMap = variants.reduce((acc: Record<string, any>, part: any) => {
      acc[part._id.toString()] = part.toObject() // Convert to plain object
      return acc
    }, {})

    // Map the variants data onto productVariants
    const transformedProductData = productData.map((product) => ({
      ...product,
      productVariants: product.productParts.map((part) => ({
        ...part,
        ...partsMap[part.id] // Merge part data with the existing product part data
      }))
    }))

    return transformedProductData
  } catch (error) {
    console.error('Error transforming product data:', error)
    throw new Error('Unable to transform product data.')
  }
}

// List products
const listProduct = async (_: Request, res: Response) => {
  try {
    // Fetch products with related ProductParts and Category
    const products = await fetchProducts()

    if (products.length === 0) {
      return res
        .status(200)
        .json({ products: [], error: 'No products available in stock.' })
    }

    // Transform product data
    const transformedData = await transformProductData(products)

    // Send the transformed data in the response
    res.status(200).json(transformedData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Unable to fetch products.' })
  }
}

const createProduct = async (data: {
  name: string
  basePrice: number
  categoryId: string
  prohibitedCombinations: any
}) => {
  try {
    return await Product.create(data)
  } catch (error) {
    console.error(error)
    throw new Error('Error creating product')
  }
}

const addProductVariants = async (productId: string, partIds: string[]) => {
  try {
    if (!productId || !partIds) throw new Error('Invalid input')

    // Verify part existence
    const variants = await Variant.find({ _id: { $in: partIds } }, '_id')
    if (variants.length !== partIds.length)
      console.warn('Some variants do not exist')

    const partsId = JSON.stringify(variants)

    // Add variants to ProductParts
    const { _id } = await ProductVariants.create({
      productId,
      partsId // Store variants as JSON
    })

    console.log('Product variants added successfully')
    return _id
  } catch (error) {
    console.error('Error adding product variants:', error)
    throw new Error('Error adding product variants')
  }
}

// Update product variants column
const updateProductPartsColumn = async (
  productId: string,
  productVariantId: Types.ObjectId
) => {
  try {
    const product = await Product.findById(productId)

    if (product) {
      product.productVariantId = productVariantId
      await product.save()
      return product
    } else {
      return { product, message: 'Product not found' }
    }
  } catch (error) {
    console.error(error)
    throw new Error('Error updating product variants column')
  }
}

const newProduct = async (req: Request, res: Response) => {
  try {
    const productData = {
      name: req.body.productName,
      basePrice: req.body.basePrice,
      categoryId: req.body.categoryId,
      prohibitedCombinations: req.body.combinations
    }

    const { _id } = await createProduct(productData)
    const productPartsId = await addProductVariants(_id, req.body.options)
    const response = await updateProductPartsColumn(_id, productPartsId)

    res.status(201).json({ response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Unable to add product.' })
  }
}

const validateCombinations = async (req: Request, res: Response) => {
  const { productId } = req.params
  const { selectedOptions } = req.body

  try {
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    const isValid = product.validateCombinations(selectedOptions)
    res.json({ isValid })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const calculatePrice = async (req: Request, res: Response) => {
  const { productId } = req.params
  const variantsId = Object.values(req.body.selectedOptions).map(
    (id) => id as string
  )

  try {
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    const totalPrice = await product.calculatePrice(variantsId)
    res.json({ totalPrice })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export { listProduct, newProduct, calculatePrice, validateCombinations }
