const mongoose = require('mongoose');

const mesasSchema = new mongoose.Schema({
    id: Number,
    nummesa: Number,
    isActive: Boolean,
});

const mesas = mongoose.model("mesas", mesasSchema);

module.exports = mesas;
