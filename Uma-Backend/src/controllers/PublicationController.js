const {Router} = require('express');
const router = Router();

const publicationModel = require("../models/PublicationModel");
const productModel = require("../models/ProductModel");
const storeModel = require("../models/StoreModel");

//----------------------CRUD PUBLICACIONES-----------------
//#Get
router.get("/publicaciones", async (req, res) => {
    try {
        const publications = await publicationModel.find().populate('producto_id');

        if (!publications || publications.length === 0) {
            return res.status(404).json({ error: "No se encontraron publicaciones" });
        }

        // Mapear las publicaciones para incluir la información del producto
        const responseData = await Promise.all(publications.map(async (publication) => {
            const product = await productModel.findById(publication.producto_id);

            return {
                _id: publication._id,
                titulo: publication.titulo,
                descripcion: publication.descripcion,
                fecha: publication.fecha,
                imagenes: publication.imagenes,
                tienda_id: publication.tienda_id,
                producto: product || null 
            };
        }));

        res.json(responseData);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener las publicaciones" });
    }
});

//#Post
router.post("/publicaciones", async (req, res) => {
    try {

        //Verificar que exista el producto y la tienda
        const product = await productModel.findById(req.body.producto_id);
        const store = await storeModel.findById(req.body.tienda_id);

        if (!product) {
            return res.status(404).json({ status: "Producto no encontrado" });
        }

        if (!store) {
            return res.status(404).json({ status: "Tienda no encontrada" });
        }

        //Crear la publicacion y añadirle la fecha
        req.body.fecha = new Date();
        
        const publication = await publicationModel.create(req.body);
        res.status(201).json({ status: "Publicación agregada", publication });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al agregar la publicación" });
    }
});

//#Get by id
router.get("/publicaciones/:id", async (req, res)=>{
    try {
    const publication= await publicationModel.findById(req.params.id);
    const product = await productModel.findById(publication.producto_id);

    if (!product) {
        return res.status(404).json({ error: "Producto asociado no encontrado" });
    }
    
    const responseData = {
        _id: publication._id,
        titulo: publication.titulo,
        descripcion: publication.descripcion,
        fecha: publication.fecha,
        imagenes : publication.imagenes,
        tienda_id: publication.tienda_id,
        producto: product 
    };

    res.json(responseData);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener la publicación" });
    }
});

//#Put
router.put("/publicaciones/:id", async (req, res) => {
    try {
        await publicationModel.findOneAndUpdate({ _id: req.params.id }, req.body);
        res.status(200)({ status: "Publicación Actualizada" });
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
