import Product from '../models/Product.js';

export const createProduct = async (payload) => {
  const product = new Product(payload);
  return await product.save();
};

export const getProductById = async (id) => {
  return await Product.findById(id).lean();
};

export const updateProduct = async (id, updates) => {
  if (updates.id) delete updates.id;
  return await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).lean();
};

export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id).lean();
};

export const listProducts = async ({ limit=10, page=1, sort, query }) => {
  const filter = {};
  if (query) {
    if (query === 'available') filter.status = true;
    else if (query === 'unavailable') filter.status = false;
    else filter.category = query;
  }
  const sortOption = {};
  if (sort === 'asc') sortOption.price = 1;
  else if (sort === 'desc') sortOption.price = -1;
  const skip = (page - 1) * limit;
  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter).sort(sortOption).skip(skip).limit(limit).lean();
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return { products, total, totalPages };
};
