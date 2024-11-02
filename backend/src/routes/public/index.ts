import { Router } from 'express'

import { productRoutes } from './productRoutes'

export default (routes: Router): void => {
  productRoutes(routes)
}
