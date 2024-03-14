const comandaModel = require("../database/models/comanda.model");

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

module.exports = { listarComanda, agregarComanda, eliminarComanda };
