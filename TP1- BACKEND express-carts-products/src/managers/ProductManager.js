const fs = require('fs').promises;
const path = require('path');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async #ensureFile() {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, JSON.stringify([] , null, 2));
    }
  }

  async #readAll() {
    await this.#ensureFile();
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data || '[]');
  }

  async #writeAll(items) {
    await fs.writeFile(this.filePath, JSON.stringify(items, null, 2));
  }

  #generateId(items) {
    // Genera un id string incremental basado en el mayor existente
    const maxId = items.reduce((max, p) => {
      const num = Number(p.id);
      return Number.isFinite(num) ? Math.max(max, num) : max;
    }, 0);
    return String(maxId + 1);
  }

  async getAll() {
    return this.#readAll();
  }

  async getById(id) {
    const items = await this.#readAll();
    return items.find(p => String(p.id) === String(id)) || null;
  }

  async add(product) {
    const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
    for (const f of requiredFields) {
      if (product[f] === undefined) {
        const err = new Error(`Falta el campo requerido: ${f}`);
        err.status = 400;
        throw err;
      }
    }
    const items = await this.#readAll();

    // code único
    if (items.some(p => p.code === product.code)) {
      const err = new Error('El campo "code" ya existe.');
      err.status = 400;
      throw err;
    }

    const newProduct = {
      id: this.#generateId(items),
      title: String(product.title),
      description: String(product.description),
      code: String(product.code),
      price: Number(product.price),
      status: product.status === undefined ? true : Boolean(product.status),
      stock: Number(product.stock),
      category: String(product.category),
      thumbnails: Array.isArray(product.thumbnails) ? product.thumbnails.map(String) : []
    };

    items.push(newProduct);
    await this.#writeAll(items);
    return newProduct;
  }

  async update(id, fields) {
    if ('id' in fields) {
      const err = new Error('No se permite actualizar el id');
      err.status = 400;
      throw err;
    }
    const items = await this.#readAll();
    const idx = items.findIndex(p => String(p.id) === String(id));
    if (idx === -1) {
      const err = new Error('Producto no encontrado');
      err.status = 404;
      throw err;
    }

    // si viene code, validar unicidad
    if (fields.code && items.some(p => p.code === fields.code && String(p.id) !== String(id))) {
      const err = new Error('El campo "code" ya existe en otro producto.');
      err.status = 400;
      throw err;
    }

    const updated = { ...items[idx], ...fields };
    items[idx] = updated;
    await this.#writeAll(items);
    return updated;
  }

  async delete(id) {
    const items = await this.#readAll();
    const idx = items.findIndex(p => String(p.id) === String(id));
    if (idx === -1) {
      const err = new Error('Producto no encontrado');
      err.status = 404;
      throw err;
    }
    const [deleted] = items.splice(idx, 1);
    await this.#writeAll(items);
    return deleted;
  }
}

module.exports = ProductManager;
