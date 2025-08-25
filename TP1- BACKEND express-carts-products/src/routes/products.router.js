const { Router } = require('express');
const path = require('path');
const ProductManager = require('../managers/ProductManager');

const router = Router();
const productsPath = path.join(__dirname, '..', 'data', 'products.json');
const pm = new ProductManager(productsPath);

// GET / - lista todos
router.get('/', async (_req, res) => {
  try {
    const items = await pm.getAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /:pid - obtiene por id
router.get('/:pid', async (req, res) => {
  try {
    const item = await pm.getById(req.params.pid);
    if (!item) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST / - crea
router.post('/', async (req, res) => {
  try {
    const created = await pm.add(req.body || {});
    res.status(201).json(created);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// PUT /:pid - actualiza (sin id)
router.put('/:pid', async (req, res) => {
  try {
    const updated = await pm.update(req.params.pid, req.body || {});
    res.json(updated);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// DELETE /:pid - elimina
router.delete('/:pid', async (req, res) => {
  try {
    const deleted = await pm.delete(req.params.pid);
    res.json({ deleted });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

module.exports = router;
