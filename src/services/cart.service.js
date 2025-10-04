import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const createCart = async () => {
  const cart = new Cart();
  return await cart.save();
};

export const getCartById = async (id) => {
  // devuelve el carrito con productos poblados como objeto plano
  const cart = await Cart.findById(id).populate('products.product').lean();
  return cart;
};

export const addProductToCart = async (cid, pid) => {
  const cart = await Cart.findById(cid);
  if (!cart) return null;

  const prodIndex = cart.products.findIndex(p => String(p.product) === String(pid));
  if (prodIndex !== -1) {
    cart.products[prodIndex].quantity += 1;
  } else {
    const productExists = await Product.findById(pid);
    if (!productExists) return null;
    cart.products.push({ product: pid, quantity: 1 });
  }

  await cart.save();
  await cart.populate('products.product');
  return cart.toObject();
};

export const deleteProductFromCart = async (cid, pid) => {
  const cart = await Cart.findById(cid);
  if (!cart) return null;

  cart.products = cart.products.filter(p => String(p.product) !== String(pid));
  await cart.save();
  await cart.populate('products.product');
  return cart.toObject();
};

export const updateCartProducts = async (cid, productsArray) => {
  const cart = await Cart.findById(cid);
  if (!cart) return null;

  // productsArray esperado: [{ product: "<id>", quantity: 2 }, ...]
  cart.products = productsArray.map(p => ({ product: p.product, quantity: p.quantity }));
  await cart.save();
  await cart.populate('products.product');
  return cart.toObject();
};

export const updateProductQuantity = async (cid, pid, qty) => {
  const cart = await Cart.findById(cid);
  if (!cart) return null;

  const prod = cart.products.find(p => String(p.product) === String(pid));
  if (!prod) return null;

  prod.quantity = qty;
  await cart.save();
  await cart.populate('products.product');
  return cart.toObject();
};

export const clearCart = async (cid) => {
  const cart = await Cart.findById(cid);
  if (!cart) return null;

  cart.products = [];
  await cart.save();
  return cart.toObject();
};
