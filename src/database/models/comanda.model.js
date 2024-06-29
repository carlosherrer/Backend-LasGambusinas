const mongoose = require('mongoose');
const moment = require('moment-timezone');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const comandaSchema = new mongoose.Schema({
    mozos: { type: mongoose.Schema.Types.ObjectId, ref:'mozos' },
    mesas: { type: mongoose.Schema.Types.ObjectId, ref:'mesas' },
    platos: [{
        plato: { type: mongoose.Schema.Types.ObjectId, ref: 'platos' },
        estado: { type: String, default: 'pendiente' }
    }],
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
        default: 'ingresante'
    },
    IsActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: () => {
            const currentDate = moment.tz("America/Lima").format('YYYY-MM-DD');
            return currentDate;
        }
    },
    comandaNumber: {
        type: Number
    }
},{ setDefaultsOnInsert: true });

comandaSchema.plugin(AutoIncrement, { inc_field: 'comandaNumber' });

comandaSchema.pre('save', function(next) {
    if (this.isNew && !this.cantidades.length) {
        this.cantidades = new Array(this.platos.length).fill(1);
    }
    next();
});

const comandaModel = mongoose.model('Comanda', comandaSchema);

module.exports = comandaModel