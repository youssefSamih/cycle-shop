import { Router } from 'express'

import {
  newProduct,
  listProduct,
  calculatePrice,
  validateCombinations
} from '../../controllers/products-controller'
import {
  newVariant,
  listVariants
} from '../../controllers/products-variants-controller'

export const productRoutes = (routes: Router): void => {
  routes.get('/api/products', listProduct).get('/api/variants', listVariants)

  routes
    .post('/api/variants', newVariant)
    .post('/api/products', newProduct)
    .post('/api/products/:productId/calculate-price', calculatePrice)
    .post(
      '/api/products/:productId/validate-combinations',
      validateCombinations
    )
}
