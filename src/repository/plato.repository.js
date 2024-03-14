const plato = require('../database/models/plato.model');

const listarPlatos = async () => {
    const data = await plato.find({});
    return data;
}

const obtenerPlatoPorId = async (id) => {
    const data = await plato.findOne({ id: id });
    return data;
}

const findByCategoria = async (categoria) => {
    const data = await plato.find({ categoria: categoria });
    return data;
}

const crearPlato = async (data) => {
    await plato.create(data);
    const todosLosPlatos = await listarPlatos();
    return todosLosPlatos;
}

const actualizarPlato = async (id, newData) => {
    await plato.findOneAndUpdate({ id: id }, newData);
    const todosLosPlatos = await listarPlatos();
    return todosLosPlatos;
}

const borrarPlato = async (id) => {
    await plato.findOneAndDelete({ id: id });
    const todosLosPlatos = await listarPlatos();
    return todosLosPlatos;
}

module.exports = {
    listarPlatos,
    crearPlato,
    obtenerPlatoPorId,
    actualizarPlato,
    borrarPlato,
    findByCategoria
};
