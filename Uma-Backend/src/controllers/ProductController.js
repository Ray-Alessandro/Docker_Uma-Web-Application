const {Router} = require('express');
const router = Router();

const modelProduct = require("../models/ProductModel");

//-----------------CRUD PRODUCTOS-----------------
//#Get
router.get("/productos", async (req, res)=>{
    const products= await modelProduct.find();
    res.json(products);
});

//#Post
router.post("/productos", async(req, res)=>{

    const product = await modelProduct.create(req.body);
    res.json({status: "Producto agregado"}, product);
});

//#Get by id
router.get('/productos/:id', async (req, res) => {
    const product= await modelProduct.findById(req.params.id);
    res.json(product);
});

//#Put
router.put('/productos/:id', async (req, res) => {
    await modelProduct.findByIdAndUpdate(req.params.id, req.body);
    res.json({status: "Tienda Actualizada"});
});

//#Delete
router.delete("/productos/:id", async (req, res) => {
    await modelProduct.findByIdAndDelete(req.params.id);
    res.json({status: "Tienda Eliminada"});
});

//Exportamos el Controlador
module.exports = router;