const {Router} = require('express');
const router = Router();

const publicationModel = require("../models/PublicationModel");

//----------------------CRUD PUBLICACIONES-----------------
//#Get
router.get("/publicaciones", async (req, res)=>{
    const publications= await publicationModel.find();
    res.json(publications);
});

//#Post
router.post("/publicaciones", async (req, res) => {
    try {
        const publication = await publicationModel.create(req.body);
        res.status(201).json({ status: "Publicación agregada", publication });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al agregar la publicación" });
    }
});

//#Get by id
router.get("/publicaciones/:id", async (req, res)=>{
    const publication= await publicationModel.findById(req.param.id);
    res.json(publication);
});

//#Put
router.put("/publicaciones/:id", async (req, res) => {
    try {
        await publicationModel.findOneAndUpdate({ _id: req.params.id }, req.body);
        res.json({ status: "Publicación Actualizada" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al actualizar la publicación" });
    }
});

//#Delete
router.delete("/publicaciones/:id", async (req, res) => {
    try {
        const publication = await publicationModel.findById(req.params.id);

        if (!publication) {
            return res.status(404).json({ status: "Publicación no encontrada" });
        }

        await publicationModel.findByIdAndDelete(req.params.id);

        res.json({ status: "Publicación Eliminada" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al eliminar la publicación" });
    }
});

//Exportamos el Controlador
module.exports = router;