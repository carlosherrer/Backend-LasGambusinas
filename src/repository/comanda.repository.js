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

    // Cambiar el estado de isActive de las mesas que no tienen comandas
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

module.exports = { listarComanda, agregarComanda, eliminarComanda, actualizarComanda };
