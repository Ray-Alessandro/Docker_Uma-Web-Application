//Importamos Framework express
const express = require("express");

//Importamos el cors para permitir el acceso a la API
const cors = require("cors");

//Generamos la app Web
const app = express();

//Mostrar un HTML en el navegador
const path = require("path");
const publicPath = path.join(__dirname, './shared/');

//Importamos el modulo de ruta de la base de datos
const database = require('./database');

app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static(publicPath));

//Activamos el cors para permitir el acceso a la API
app.use(cors());

//Importamos el modelos de la base de datos
app.use(require("./routes/index.routes.js"));
app.use(require("./models/StoreModel.js"));
app.use(require("./models/ProductModel.js"));
app.use(require("./models/UserModel.js"));
app.use(require("./models/PublicationModel.js"));
app.use(require("./models/CommentModel.js"));
app.use(require("./models/ReactionModel.js"));

//Definimos el puerto del servicio web
app.listen(3000);
console.log("Server on port", 3000);

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});