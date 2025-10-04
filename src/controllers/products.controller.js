import * as productService from '../services/product.service.js';

export const listProductsController = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort;
    const query = req.query.query;
    const { products, total, totalPages } = await productService.listProducts({ limit, page, sort, query });
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;
    const buildLink = (p) => p ? `${req.protocol}://${req.get('host')}/api/products?page=${p}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null;
    res.json({
      status: 'success',
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink: buildLink(prevPage),
      nextLink: buildLink(nextPage)
    });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
};

export const getProductController = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProductController = async (req, res, io) => {
  try {
    const created = await productService.createProduct(req.body);
    const { products } = await productService.listProducts({ limit: 1000, page:1 });
    io.emit('updateProducts', products);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const updated = await productService.updateProduct(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProductController = async (req, res, io) => {
  try {
    const deleted = await productService.deleteProduct(req.params.pid);
    if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
    const { products } = await productService.listProducts({ limit: 1000, page:1 });
    io.emit('updateProducts', products);
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
