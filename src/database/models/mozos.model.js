const mongoose = require('mongoose');

const mozosSchema = new mongoose.Schema({
    id: Number,
    name: String,
    DNI: Number,
    phoneNumber: Number,
});

const mozos = mongoose.model('mozos', mozosSchema);

module.exports = mozos;