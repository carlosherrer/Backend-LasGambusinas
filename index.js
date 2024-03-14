require ('./src/database/database');
const express = require('express');

const mesasRoutes = require('./src/controllers/mesasController')
const mozosRoutes = require('./src/controllers/mozosController')
const platoRoutes = require('./src/controllers/platoController')
const comandaRoutes = require('./src/controllers/comandaController')

const app = express();
const port = process.env.PORT || 8000;

var cors = require('cors');

app.use(cors())

const routes = [mesasRoutes, mozosRoutes, platoRoutes, comandaRoutes];

app.use(express.json());
app.use('/api',routes);


app.get('/', (req, res)=>{
  res.send("Holiiii xd")
});

app.listen(port, ()=> console.log('servidor corriendo en el puerto', port));