const mongoose = require('mongoose');

const comandaSchema = new mongoose.Schema({
    mozos: { type: mongoose.Schema.Types.ObjectId, ref:'mozos' },
    mesas: { type: mongoose.Schema.Types.ObjectId, ref:'mesas' },
    platos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'platos' }],
    cantidades: [Number],
    observaciones: String,
});

const comandaModel = mongoose.model('Comanda', comandaSchema);

module.exports = comandaModel