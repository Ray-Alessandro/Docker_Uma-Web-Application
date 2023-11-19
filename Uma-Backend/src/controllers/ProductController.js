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
router.post("/productos", async (req, res) => {
    try {
        const product = await modelProduct.create(req.body);
        res.status(201).json({ status: "Producto agregado", product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al agregar el producto" });
    }
});

//#Get by id
router.get('/productos/:id', async (req, res) => {
    const product= await modelProduct.findById(req.params.id);
    res.json(product);
});

//#Put
router.put('/productos/:id', async (req, res) => {
    try {
        await modelProduct.findByIdAndUpdate(req.params.id, req.body);
        res.json({ status: "Producto Actualizado" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
});

//#Delete
router.delete("/productos/:id", async (req, res) => {
    try {
        const product = await modelProduct.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ status: "Producto no encontrado" });
        }

        await modelProduct.findByIdAndDelete(req.params.id);

        res.json({ status: "Producto Eliminado" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
});

//Exportamos el Controlador
module.exports = router;