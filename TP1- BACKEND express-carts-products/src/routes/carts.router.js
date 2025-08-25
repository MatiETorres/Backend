const { Router } = require('express');
const path = require('path');
const CartManager = require('../managers/CartManager');

const router = Router();
const cartsPath = path.join(__dirname, '..', 'data', 'carts.json');
const cm = new CartManager(cartsPath);

// POST / - crear carrito
router.post('/', async (_req, res) => {
  try {
    const cart = await cm.createCart();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /:cid - listar productos del carrito
router.get('/:cid', async (req, res) => {
  try {
    const cart = await cm.getById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart.products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /:cid/product/:pid - agregar producto
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cart = await cm.addProductToCart(req.params.cid, req.params.pid);
    res.status(201).json(cart);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

module.exports = router;
