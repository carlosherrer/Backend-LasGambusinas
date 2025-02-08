const mozos = require('../database/models/mozos.model');
const mongoose = require('mongoose');

const listarMozos = async () => {
    const data = await mozos.find();
    return data;

}

const crearMozo = async (data) => {
    await mozos.create(data);
    const todoslosmozos = await listarMozos();
    return todoslosmozos;
}

const obtenerMozosPorId = async (id) => {
    const mozo = await mozos.findOne({mozoId: id});
    return mozo;
}



const borrarMozo = async (id) => {
    try {
        await mozos.findOneAndDelete({id});

        const todoslosmozos = await listarMozos();
        return  todoslosmozos;
    } catch(error){
        console.error('Error al eliminar usuario', error);
        throw error;
    }
};


const autenticarMozo = async (name,DNI) => {
    try {
        const Mozo = await mozos.findOne({
            name, 
            DNI,
        })

        return Mozo;
    }catch(error){
        console.error('Error al autenticar usuario', error);
        throw error;
    }
};




module.exports = {
    listarMozos,
    crearMozo,
    obtenerMozosPorId,
    borrarMozo,
    autenticarMozo
};