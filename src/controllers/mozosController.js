const express = require("express");

const router = express.Router();

const { listarMozos, crearMozo, obtenerMozosPorId, borrarMozo, autenticarMozo} = require("../repository/mozos.repository");

router.get("/mozos", async (req, res) => {
  const data = await listarMozos();
  res.json(data);
});

router.get("/mozos/:id", async (req, res) => {
  try {
    const codigomozo = req.params.id;

    const mozo = await obtenerMozosPorId({ id: codigomozo });

    if (!mozo) {
      console.log("Estudiante no encontrado");
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    console.log('Mozo encontrado:', mozo);
    res.json(mozo);

  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post('/mozos', async (req, res) => {
  try {
      const data = req.body;
      const result = await crearMozo(data);
      res.json(result);
      console.log("Nuevo mozo creado:", result);
  } catch(error) {
      console.error("Error al procesar la solicitud:", error);
      res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put('/mozos/:id', async (req, res) => {
    try{
        const id = req.params.id;

        const mozo = await obtenerMozosPorId({ id });

        if(!mozo){
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const data = await actualizarMozo(mozo, req.body);
        res.json(data);

    }catch(error){
        console.error('Error al actualizar el usuario', error);
        res.status(500).json({ message: 'Error interno del sevidor' });
    }
});

router.delete('/mozos/:id', async(req, res) => {
  try {
    const id = req.params.id;

    const mozo = await obtenerMozosPorId({ id });

    if (!mozo) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const data = await borrarMozo(id);
    res.json(data);
} catch (error) {
    console.error('Error al eliminar el usuario', error);
    res.status(500).json({ message: 'Error interno del servidor' });
}
});


router.post('/mozos/auth', async (req, res) => {
  try {
      const { name, DNI } = req.body;
      // Verificar si el usuario existe con el name y DNI proporcionados
      const mozo = await autenticarMozo(name, DNI);
      if (!mozo) {
          return res.status(401).json({ message: 'Credenciales incorrectas' });
      }
      // Puedes agregar más lógica de autenticación aquí según tus necesidades.
      // Devolver información del mozo autenticado
      res.json({ message: 'Mozo autenticado correctamente', mozo });
  } catch (error) {
      console.error('Error al autenticar el mozo', error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;