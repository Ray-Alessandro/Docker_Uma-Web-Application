const {Router} = require('express');
const router = Router();

//Importamos los controladores
const userController = require("../controllers/UserController");
const publicationController = require("../controllers/PublicationController");
const productController = require("../controllers/ProductController");
const storeController = require("../controllers/StoreController");

//Importamos los controladores en el router
router.use(userController);
router.use(publicationController);
router.use(productController);
router.use(storeController);

//Exportamos el router al index.js
module.exports = router;