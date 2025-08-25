const fs = require('fs').promises;
const path = require('path');

class CartManager {
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
    const maxId = items.reduce((max, c) => {
      const num = Number(c.id);
      return Number.isFinite(num) ? Math.max(max, num) : max;
    }, 0);
    return String(maxId + 1);
  }

  async createCart() {
    const carts = await this.#readAll();
    const newCart = {
      id: this.#generateId(carts),
      products: []
    };
    carts.push(newCart);
    await this.#writeAll(carts);
    return newCart;
  }

  async getById(id) {
    const carts = await this.#readAll();
    return carts.find(c => String(c.id) === String(id)) || null;
  }

  async addProductToCart(cid, pid) {
    const carts = await this.#readAll();
    const idx = carts.findIndex(c => String(c.id) === String(cid));
    if (idx === -1) {
      const err = new Error('Carrito no encontrado');
      err.status = 404;
      throw err;
    }
    const cart = carts[idx];
    const existing = cart.products.find(p => String(p.product) === String(pid));
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.products.push({ product: String(pid), quantity: 1 });
    }
    carts[idx] = cart;
    await this.#writeAll(carts);
    return cart;
  }
}

module.exports = CartManager;
