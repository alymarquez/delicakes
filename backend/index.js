const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')

app.use(express.json())

app.use(cors())

app.use('/productos', require('./src/routes/productosRoutes'));

app.use('/usuarios', require('./src/routes/usuarioRoutes'));

app.use('/pedidos', require('./src/routes/pedidoRoutes'));

app.use('/categorias', require('./src/routes/categoriaRoutes'));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
});
