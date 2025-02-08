require('dotenv/config');

const mongoose = require('mongoose');

mongoose.connect(process.env.DBLOCAL)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});


module.exports = mongoose;
