const {Router} = require('express');
const router = Router();

//Importamos los controladores
const userController = require("../controllers/UserController");
const publicationController = require("../controllers/PublicationController");
const productController = require("../controllers/ProductController");
const storeController = require("../controllers/StoreController");
const commentController = require("../controllers/CommentController");
const reactionController = require("../controllers/ReactionController");

//Importamos los controladores en el router
router.use(userController);
router.use(publicationController);
router.use(productController);
router.use(storeController);
router.use(commentController);
router.use(reactionController);

//Exportamos el router al index.js
module.exports = router;