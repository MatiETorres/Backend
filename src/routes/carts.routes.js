import { Router } from 'express';
import * as cartsController from '../controllers/carts.controller.js';

export default function(){
  const router = Router();

  router.post('/', cartsController.createCartController);
  router.get('/:cid', cartsController.getCartController);
  router.post('/:cid/product/:pid', cartsController.addProductToCartController);
  router.delete('/:cid/products/:pid', cartsController.deleteProductFromCartController);
  router.put('/:cid', cartsController.updateCartProductsController);
  router.put('/:cid/products/:pid', cartsController.updateProductQuantityController);
  router.delete('/:cid', cartsController.clearCartController);

  return router;
}
