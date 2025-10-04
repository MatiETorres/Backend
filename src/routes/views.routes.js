import { Router } from 'express';
import * as productService from '../services/product.service.js';
import * as cartService from '../services/cart.service.js';

export default function(io){
  const router = Router();

  router.get('/products', async (req,res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort;
    const query = req.query.query;
    const { products, total, totalPages } = await productService.listProducts({ limit, page, sort, query });
    res.render('products', { products, page, totalPages, hasPrev: page>1, hasNext: page<totalPages, prevPage: page-1, nextPage: page+1 });
  });

  router.get('/products/:pid', async (req,res) => {
    const product = await productService.getProductById(req.params.pid);
    if(!product) return res.status(404).send('Producto no encontrado');
    res.render('productDetail',{ product });
  });

  router.get('/carts/:cid', async (req,res) => {
    const cart = await cartService.getCartById(req.params.cid);
    if(!cart) return res.status(404).send('Carrito no encontrado');
    res.render('cart',{ cart });
  });

  router.get('/realtimeproducts', async (req,res) => {
    const { products } = await productService.listProducts({ limit: 1000, page:1 });
    res.render('realTimeProducts',{ products });
  });

  return router;
}
