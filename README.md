# Proyecto Final - Backend (TP)

Este repositorio contiene el proyecto final solicitado (Entrega Final). Incluye:
- API REST con `/api/products` y `/api/carts` (MongoDB + Mongoose).
- Paginación, filtros y orden en `/api/products`.
- Carritos con `populate` de productos.
- Vistas con Handlebars: `/products`, `/products/:pid`, `/carts/:cid`, `/realtimeproducts`.
- WebSockets (Socket.io) para vista en tiempo real.
- Script de seed para datos de ejemplo.

## Cómo ejecutar
1. Crear `.env` en la raíz con:
```
MONGO_URI=mongodb://127.0.0.1:27017/tp_final
PORT=8080
```
2. Instalar dependencias:
```
npm install
```
3. (Opcional) Sembrar datos de ejemplo:
```
npm run seed
```
4. Ejecutar:
```
npm start
```
5. Abrir en el navegador:
- http://localhost:8080/products
- http://localhost:8080/realtimeproducts
- API: http://localhost:8080/api/products
