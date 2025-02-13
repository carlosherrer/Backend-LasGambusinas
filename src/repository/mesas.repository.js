const mesas = require('../database/models/mesas.model');

const listarMesas = async () => {
    const data = await mesas.find({});
    return data;
}

const obtenerMesaPorId = async (id) => {
    const data = await mesas.findOne({ mesasId: id });
    return data;
}

const crearMesa = async (data) => {
    await mesas.create(data);
    const todaslasmesas = await listarMesas();
    return todaslasmesas;
}

const actualizarMesa = async (_id, newData) => {
    await mesas.findOneAndUpdate({ mesasId: _id }, newData);
    const todaslasmesas = await listarMesas();
    return todaslasmesas;
}


const borrarMesa = async (id) => {
    await mesas.findOneAndDelete({ mesasId: id });
    const todaslasmesas = await listarMesas();
    return todaslasmesas;
}

module.exports = {
    listarMesas,
    crearMesa,
    obtenerMesaPorId,
    actualizarMesa,
    borrarMesa
};
