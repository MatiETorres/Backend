# TP2 - BACKEND (Express + Handlebars + WebSockets)

## Descripción
Este proyecto corresponde a la **Entrega N°2** de Backend.  
Se configuró un servidor con **Express**, **Handlebars** como motor de plantillas y **Socket.io** para trabajar con WebSockets.

El objetivo principal fue:
- Crear una vista `home.handlebars` con la lista de productos cargados.
- Crear una vista `realTimeProducts.handlebars` en el endpoint `/realtimeproducts`.
- En esta vista, cada vez que se agregue o elimine un producto, la lista se actualiza automáticamente en tiempo real gracias a WebSockets.

---

## Instalación
Clonar el repositorio y dentro de la carpeta ejecutar:

```bash
npm install
