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
router.post("/publicaciones", async (req, res)=>{
    const publication = await publicationModel.create(req.body);
    res.json({status: "Publicacion agregada"}, publication);
});

//#Get by id
router.get("/publicaciones/:id", async (req, res)=>{
    const publication= await publicationModel.findById(req.param.id);
    res.json(publication);
});

//#Put
router.put("/publicaciones/:id", async (req, res)=>{
    await publicationModel.findOneAndUpdate({_id:req.params.id}, req.body);
    res.json({status: "Publicacion Actualizada"});
});


//#Delete
router.delete("/publicaciones/:id", async (req, res)=>{
    const publication = await publicationModel.findById(req.params.id);
    if(!publication){
        return res.status(404).json({status: "Publicacion no encontrada"});
    }

    await publicationModel.findByIdAndDelete(req.params.id);

    res.json({status: "Publicacion Eliminada"});
});

//Exportamos el Controlador
module.exports = router;