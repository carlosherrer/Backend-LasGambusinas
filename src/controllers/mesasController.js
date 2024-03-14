const express = require("express");
const router = express.Router();
const {
    listarMesas,
    obtenerMesaPorId,
    crearMesa,
    actualizarMesa,
    borrarMesa
} = require("../repository/mesas.repository");

router.get("/mesas", async (req, res) => {
    try {
        const data = await listarMesas();
        res.json(data);
    } catch (error) {
        console.error('Error al listar las mesas:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.get("/mesas/:id", async (req, res) => {
    try {
        const idMesa = req.params.id;
        const mesa = await obtenerMesaPorId(idMesa);
        if (!mesa) {
            console.log("Mesa no encontrada");
            return res.status(404).json({ error: "Mesa no encontrada" });
        }
        console.log('Mesa encontrada:', mesa);
        res.json(mesa);
    } catch (error) {
        console.error("Error al obtener la mesa:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.post('/mesas', async (req, res) => {
    try {
        const nuevaMesa = req.body;
        const mesaCreada = await crearMesa(nuevaMesa);
        res.json(mesaCreada);
        console.log("Se creó una nueva mesa:", mesaCreada);
    } catch (error) {
        console.error("Error al crear la mesa:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.put('/mesas/:_id', async (req, res) => {
    try {
        const idMesa = req.params._id;
        const newData = req.body;
        const mesaActualizada = await actualizarMesa(idMesa, newData);
        res.json(mesaActualizada);
        console.log("Se actualizó la mesa:", mesaActualizada);
    } catch (error) {
        console.error("Error al actualizar la mesa:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.delete('/mesas/:id', async (req, res) => {
    try {
        const idMesa = req.params.id;
        const mesaEliminada = await borrarMesa(idMesa);
        res.json(mesaEliminada);
        console.log("Se eliminó la mesa:", mesaEliminada);
    } catch (error) {
        console.error("Error al eliminar la mesa:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;
