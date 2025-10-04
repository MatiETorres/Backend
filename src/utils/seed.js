import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tp_final';

const sample = [
  { title: 'Mate', description: 'Mate artesanal', code:'MAT001', price:1000, stock:50, category:'mates', thumbnails:[] },
  { title: 'Termo', description: 'Termo 1L', code:'TER001', price:4000, stock:20, category:'accesorios', thumbnails:[] },
  { title: 'Remera', description: 'Remera deportiva', code:'REM001', price:2500, stock:30, category:'ropa', thumbnails:[] }
];

mongoose.connect(MONGO_URI)
  .then(async ()=>{
    console.log('Connected - seeding');
    await Product.deleteMany({});
    await Product.insertMany(sample);
    console.log('Seed complete');
    process.exit(0);
  })
  .catch(err => { console.error(err); process.exit(1); });
