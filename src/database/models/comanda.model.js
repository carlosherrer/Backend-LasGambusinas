const mongoose = require('mongoose');

const comandaSchema = new mongoose.Schema({
    mozos: { type: mongoose.Schema.Types.ObjectId, ref:'mozos' },
    mesas: { type: mongoose.Schema.Types.ObjectId, ref:'mesas' },
    platos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'platos' }],
    cantidades: [Number],
    observaciones: String,
    status: { 
        type: String,
        default: 'preparación'
    },
    IsActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: () => {
            const currentDate = new Date();
            const isoDate = currentDate.toISOString().split('T')[0];
            return new Date(isoDate);
        }
    }
});

const comandaModel = mongoose.model('Comanda', comandaSchema);

module.exports = comandaModel