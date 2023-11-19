const {Router} = require('express');
const router = Router();

const storeModel = require("../models/StoreModel")
//-----------------CRUD TIENDAS-----------------
//#Get
router.get("/tiendas", async (req, res)=>{
    const stores= await storeModel.find();
    res.json(stores);
});

//#Get by id
router.get('/tiendas/:id', async (req, res) => {
    const store= await storeModel.findById(req.params.id);
    res.json(store);
});

//#Post
router.post("/tiendas", async (req, res) => {
    try {
        const store = await storeModel.create(req.body);
        res.status(201).json({ status: "Tienda agregada", store });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al agregar la tienda" });
    }
});

//#Put
router.put('/tiendas/:id', async (req, res) => {
    try {
        await storeModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200)({ status: "Tienda Actualizada" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al actualizar la tienda" });
    }
});

//#Delete
router.delete("/tiendas/:id", async (req, res) => {
    try {
        await storeModel.findByIdAndDelete(req.params.id);
        res.json({ status: "Tienda Eliminada" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al eliminar la tienda" });
    }
});

module.exports = router;