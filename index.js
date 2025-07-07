const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/productos', require('./src/routes/productosRoutes'));

app.use('/usuarios', require('./src/routes/usuarioRoutes'));

app.use('/pedidos', require('./src/routes/pedidoRoutes'));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
});
