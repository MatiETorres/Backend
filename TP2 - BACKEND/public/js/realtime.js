const socket = io();
const productForm = document.getElementById("productForm");
const productsList = document.getElementById("productsList");

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(productForm);
  const product = Object.fromEntries(formData);
  product.price = parseFloat(product.price);
  socket.emit("newProduct", product);
  productForm.reset();
});

socket.on("updateProducts", (product) => {
  const li = document.createElement("li");
  li.dataset.id = product.id;
  li.innerHTML = `${product.title} - $${product.price}
    <button onclick="deleteProduct('${product.id}')">❌</button>`;
  productsList.appendChild(li);
});

function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}

socket.on("removeProduct", (id) => {
  const li = productsList.querySelector(`[data-id='${id}']`);
  if (li) li.remove();
});