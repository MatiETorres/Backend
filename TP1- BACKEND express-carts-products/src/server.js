const express = require('express');
const morgan = require('morgan');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// healthcheck simple
app.get('/health', (_req, res) => res.json({ ok: true }));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
