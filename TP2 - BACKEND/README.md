# TP - API de Productos y Carritos (Entrega 1)

Servidor **Node.js + Express** que implementa:

- `GET /api/products` – lista todos los productos
- `GET /api/products/:pid` – obtiene un producto por id
- `POST /api/products` – crea un producto (id autogenerado)
- `PUT /api/products/:pid` – actualiza un producto (no permite cambiar/eliminar `id`)
- `DELETE /api/products/:pid` – elimina un producto

Carritos:
- `POST /api/carts` – crea un carrito (id autogenerado)
- `GET /api/carts/:cid` – lista productos del carrito
- `POST /api/carts/:cid/product/:pid` – agrega producto al carrito (incrementa `quantity` si ya existe)

## Persistencia
Utiliza **sistema de archivos** (`products.json` y `carts.json`).

## Cómo correr
```bash
npm install
npm run start
# Servidor en puerto 8080
```

## Pruebas rápidas (curl)
```bash
# Crear producto
curl -X POST http://localhost:8080/api/products  -H "Content-Type: application/json"  -d '{"title":"Mate Imperial","description":"Mate de calabaza","code":"MAT-001","price":19999,"status":true,"stock":50,"category":"mates","thumbnails":["/imgs/mate1.jpg"]}'

# Listar productos
curl http://localhost:8080/api/products

# Obtener por id (reemplazar :id)
curl http://localhost:8080/api/products/:id

# Actualizar (no enviar id)
curl -X PUT http://localhost:8080/api/products/:id  -H "Content-Type: application/json"  -d '{"price":17999,"stock":40}'

# Eliminar
curl -X DELETE http://localhost:8080/api/products/:id

# Crear carrito
curl -X POST http://localhost:8080/api/carts

# Ver carrito
curl http://localhost:8080/api/carts/:cid

# Agregar producto a carrito
curl -X POST http://localhost:8080/api/carts/:cid/product/:pid
```
