import { Router } from 'express';
import * as productsController from '../controllers/products.controller.js';

export default function(io){
  const router = Router();

  router.get('/', productsController.listProductsController);
  router.get('/:pid', productsController.getProductController);
  router.post('/', (req,res) => productsController.createProductController(req,res,io));
  router.put('/:pid', productsController.updateProductController);
  router.delete('/:pid', (req,res) => productsController.deleteProductController(req,res,io));

  return router;
}
