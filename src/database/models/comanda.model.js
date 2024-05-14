const mongoose = require('mongoose');

const comandaSchema = new mongoose.Schema({
    mozos: { type: mongoose.Schema.Types.ObjectId, ref:'mozos' },
    mesas: { type: mongoose.Schema.Types.ObjectId, ref:'mesas' },
    platos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'platos' }],
    cantidades: {
        type: [Number],
        default: function() {
            if (this.cantidades.length === 0) {
                return new Array(this.platos.length).fill(1);
            } else {
                return this.cantidades;
            }
        }
    },
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
},{ setDefaultsOnInsert: true });


comandaSchema.pre('save', function(next) {
    if (this.isNew && !this.cantidades.length) {
        this.cantidades = new Array(this.platos.length).fill(1);
    }
    next();
});

const comandaModel = mongoose.model('Comanda', comandaSchema);

module.exports = comandaModel