// Este es solo un ejemplo básico de cómo podrías implementar el backend para el panel de administración
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// Conexión a la base de datos
mongoose.connect('mongodb://localhost/electronica', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir el modelo de producto
const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String
}));

// Ruta para añadir un producto
app.post('/admin/product', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.send('Producto añadido');
});

// Ruta para obtener todos los productos
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
});
