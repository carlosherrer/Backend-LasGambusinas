const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const mesasSchema = new mongoose.Schema({
    mesasId: { type: Number, unique: true },
    nummesa: { type: Number, required: true, min: 0 },
    isActive: { type: Boolean, required: true},
});

mesasSchema.plugin(AutoIncrement, { inc_field: 'mesasId' });
const mesas = mongoose.model("mesas", mesasSchema);

module.exports = mesas;
