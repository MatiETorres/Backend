const socket = io();

const form = document.getElementById('productForm');
if(form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const product = {
      title: fd.get('title'),
      description: fd.get('description'),
      code: fd.get('code'),
      price: Number(fd.get('price')),
      stock: Number(fd.get('stock')),
      category: fd.get('category'),
      thumbnails: fd.get('thumbnails') ? fd.get('thumbnails').split(',').map(s=>s.trim()) : []
    };
    socket.emit('newProduct', product);
    form.reset();
  });
}

socket.on('updateProducts', (products) => {
  const ul = document.getElementById('productsList');
  if(!ul) return;
  ul.innerHTML = '';
  products.forEach(p => {
    const li = document.createElement('li');
    li.dataset.id = p._id;
    li.innerHTML = `${p.title} - $${p.price} <button onclick="deleteProduct('${p._id}')">Eliminar</button>`;
    ul.appendChild(li);
  });
});

function deleteProduct(id){
  socket.emit('deleteProduct', id);
}
