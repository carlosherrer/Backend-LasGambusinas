const express = require('express');

const router = express.Router();

const { listarComanda, agregarComanda, eliminarComanda } = require('../repository/comanda.repository');

router.get('/comanda', async (req, res) => {
    try {
        const data = await listarComanda();
        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al obtener las comandas' });
    }
});

router.post('/comanda', async (req, res) => {
    try {
        const data = await agregarComanda(req.body);
        res.json(data);
        console.log('Reserva exitosa');
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
});

router.delete('/comanda/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedComanda = await eliminarComanda(id);
        if (deletedComanda) {
            res.json({ message: 'Comanda eliminada exitosamente' });
        } else {
            res.status(404).json({ message: 'Comanda no encontrada' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al eliminar la comanda' });
    }
});

module.exports = router;
