import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import productsRouter from './src/routes/products.routes.js';
import cartsRouter from './src/routes/carts.routes.js';
import viewsRouter from './src/routes/views.routes.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Redirect root to products (presentation-friendly)
app.get('/', (req, res) => res.redirect('/products'));

// Routers (pass io to products routes so controllers can emit)
app.use('/api/products', productsRouter(io));
app.use('/api/carts', cartsRouter());
app.use('/', viewsRouter(io));

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tp_final';

mongoose.connect(MONGO_URI)
  .then(()=> {
    console.log('MongoDB connected');
    server.listen(PORT, ()=> console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
