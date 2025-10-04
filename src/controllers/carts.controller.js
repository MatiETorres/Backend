import * as cartService from '../services/cart.service.js';

export const createCartController = async (req, res) => {
  try {
    const cart = await cartService.createCart();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCartController = async (req, res) => {
  try {
    const cart = await cartService.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addProductToCartController = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.addProductToCart(cid, pid);
    if (!cart) return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProductFromCartController = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.deleteProductFromCart(cid, pid);
    if (!cart) return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCartProductsController = async (req, res) => {
  try {
    const { cid } = req.params;
    const productsArray = req.body.products;
    const cart = await cartService.updateCartProducts(cid, productsArray);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProductQuantityController = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await cartService.updateProductQuantity(cid, pid, Number(quantity));
    if (!cart) return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const clearCartController = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.clearCart(cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json({ message: 'Carrito vaciado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
