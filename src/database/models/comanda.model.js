const mongoose = require('mongoose');
const moment = require('moment-timezone');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const comandaSchema = new mongoose.Schema({
    mozos: { type: mongoose.Schema.Types.ObjectId, ref: 'mozos' },
    mesas: { type: mongoose.Schema.Types.ObjectId, ref: 'mesas' },
    platos: [{
        plato: { type: mongoose.Schema.Types.ObjectId, ref: 'platos' },
        estado: { type: String, default: 'pendiente' }
    }],
    cantidades: {
        type: [Number],
        default: function () {
            return new Array(this.platos.length).fill(1);
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
}, { setDefaultsOnInsert: true });

comandaSchema.plugin(AutoIncrement, { inc_field: 'comandaNumber' });

comandaSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('platos')) {
        // Si no hay cantidades o está vacío, llenar con 1s
        if (!this.cantidades || this.cantidades.length === 0) {
            this.cantidades = new Array(this.platos.length).fill(1);
        } else {
            // Si la longitud de cantidades no coincide con la de platos, ajustar
            const diff = this.platos.length - this.cantidades.length;
            if (diff > 0) {
                this.cantidades = this.cantidades.concat(new Array(diff).fill(1));
            }
            // Reemplazar valores nulos con 1
            this.cantidades = this.cantidades.map(cantidad => cantidad == null ? 1 : cantidad);
        }
    }
    next();
});

const comandaModel = mongoose.model('Comanda', comandaSchema);

module.exports = comandaModel;
