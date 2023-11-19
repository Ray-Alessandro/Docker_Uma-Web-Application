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
router.post("/tiendas", async(req, res)=>{
    const store = await storeModel.create(req.body);
    res.json({status: "Tienda agregada"}, store);
});

//#Put
router.put('/tiendas/:id', async (req, res) => {
    await storeModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({status: "Tienda Actualizada"});
});

//#Delete
router.delete("/tiendas/:id", async (req, res) => {
    await storeModel.findByIdAndDelete(req.params.id);
    res.json({status: "Tienda Eliminada"});
});

module.exports = router;