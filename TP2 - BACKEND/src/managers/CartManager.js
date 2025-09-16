import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class CartManager {
  constructor() {
    this.filePath = path.join(__dirname, "../../data/carts.json");
  }

  async getCarts() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async createCart() {
    const carts = await this.getCarts();
    const newCart = { id: Date.now().toString(), products: [] };
    carts.push(newCart);
    await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(c => c.id == id);
  }

  async addProductToCart(cid, pid) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex(c => c.id == cid);
    if (cartIndex === -1) return null;

    const productIndex = carts[cartIndex].products.findIndex(p => p.product == pid);
    if (productIndex === -1) {
      carts[cartIndex].products.push({ product: pid, quantity: 1 });
    } else {
      carts[cartIndex].products[productIndex].quantity++;
    }

    await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
    return carts[cartIndex];
  }
}