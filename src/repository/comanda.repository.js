const comandaModel = require("../database/models/comanda.model");
const mesasModel = require("../database/models/mesas.model");

const listarComanda = async () => {
  try {
    const data = await comandaModel
      .find()
      .populate({
        path: "mozos",
      })
      .populate({
        path: "mesas",
      })
      .populate({
        path: "platos",
      });

    const mesasSinComandas = await mesasModel.find({
      _id: { $nin: data.map(comanda => comanda.mesas._id) }
    });

    await Promise.all(mesasSinComandas.map(async (mesa) => {
      if (!mesa.isActive) {
        mesa.isActive = true;
        await mesa.save();
      }
    }));

    return data;
  } catch (error) {
    console.error("error al listar la comanda", error);
    throw error;
  }
};

const agregarComanda = async (data) => {
  await comandaModel.create(data);
  console.log(data);
  const todaslascomandas = await listarComanda();
  return todaslascomandas;
};

const eliminarComanda = async (comandaId) => {
  try {
    const deletedComanda = await comandaModel.findByIdAndDelete(comandaId);
    return deletedComanda;
  } catch (error) {
    console.error("error al eliminar la comanda", error);
    throw error;
  }
};

const actualizarComanda = async (comandaId, newData) => {
  try {
    const updatedComanda = await comandaModel.findByIdAndUpdate(
      comandaId,
      newData,
      { new: true }
    );
    return updatedComanda;
  } catch (error) {
    console.error("Error al actualizar la comanda", error);
    throw error;
  }
};

const cambiarStatusComanda = async (comandaId, nuevoStatus) => {
  try {
      const updatedComanda = await comandaModel.findByIdAndUpdate(
          comandaId,
          { status: nuevoStatus },
          { new: true }
      );
      return updatedComanda;
  } catch (error) {
      console.error("Error al cambiar el estado de la comanda", error);
      throw error;
  }
};

const cambiarEstadoComanda = async (comandaId, nuevoEstado) => {
  try {
      const updatedComanda = await comandaModel.findByIdAndUpdate(
          comandaId,
          { IsActive: nuevoEstado },
          { new: true }
      );
      return updatedComanda;
  } catch (error) {
      console.error("Error al cambiar el estado de la comanda", error);
      throw error;
  }
};

const listarComandaPorFechaEntregado = async (fecha) => {
  try {
    const data = await comandaModel.find({ 
      createdAt: fecha,
      status: { $ne: "entregado" }
    })
    .populate({
      path: "mozos",
    })
    .populate({
      path: "mesas",
    })
    .populate({
      path: "platos",
    });
    
    return data;
  } catch (error) {
    console.error("error al listar la comanda por fecha", error);
    throw error;
  }
};

const listarComandaPorFecha = async (fecha) => {
  try {
    const data = await comandaModel.find({ 
      createdAt: fecha,
      IsActive: true
    })
    .populate({
      path: "mozos",
    })
    .populate({
      path: "mesas",
    })
    .populate({
      path: "platos",
    });
    
    return data;
  } catch (error) {
    console.error("error al listar la comanda por fecha", error);
    throw error;
  }
};

module.exports = { listarComanda, agregarComanda, eliminarComanda, actualizarComanda, cambiarStatusComanda, cambiarEstadoComanda, listarComandaPorFecha, listarComandaPorFechaEntregado};
