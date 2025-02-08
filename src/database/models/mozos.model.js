const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const mozosSchema = new mongoose.Schema({
    mozoId: { type: Number, unique: true },
    name: { type: String, required: true },
    DNI: { type: Number, required: true, min: 0 },
    phoneNumber: { type: Number, required: true, min: 0 },
});

mozosSchema.plugin(AutoIncrement, { inc_field: 'mozoId' });
const mozos = mongoose.model('mozos', mozosSchema);

module.exports = mozos;