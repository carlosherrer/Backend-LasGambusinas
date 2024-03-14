const mongoose = require('mongoose');

const platoSchema = new mongoose.Schema({
    id: Number,
    nombre: String,
    precio: Number,
    stock: Number,
    categoria: String,
});

const plato = mongoose.model("platos", platoSchema);

module.exports = plato;
