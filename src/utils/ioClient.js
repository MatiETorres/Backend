export default function setupIO(ioInstance){
  ioInstance.on('connection', (socket) => {
    console.log('Socket client connected: ', socket.id);

    socket.on('newProduct', async (data) => {
      try{
        const res = await fetch('/api/products', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
        // server handles emit
      }catch(e){
        console.error(e);
      }
    });

    socket.on('deleteProduct', async (id) => {
      try{
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
      }catch(e){
        console.error(e);
      }
    });
  });
}
