const {Router} = require('express');
const router = Router();

const commentModel = require("../models/CommentModel");

//-----------------CRUD COMENTARIOS-----------------

//#Get
router.get("/comentarios", async (req, res)=>{
    const comments= await commentModel.find();
    res.json(comments);
});

//#Post
router.post("/comentarios", async (req, res) => {
    try {
        //Crear el comentario y añadirle la fecha
        req.body.fecha = new Date();
        req.body.megusta = 0; 

        const comment = await commentModel.create(req.body);
        res.status(201).json({ status: "Comentario agregado", comment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al agregar el comentario" });
    }
});

//#Get by id
router.get('/comentarios/:id', async (req, res) => {
    const comment= await commentModel.findById(req.params.id);
    res.json(comment);
});

//#Put
router.put('/comentarios/:id', async (req, res) => {
    try { 
        await commentModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200)({ status: "Comentario Actualizado" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al actualizar el comentario" });
    }
}
);

//#Delete
router.delete("/comentarios/:id", async (req, res) => {
    try {
        const comment = await commentModel.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ status: "Comentario no encontrado" });
        }

        await commentModel.findByIdAndDelete(req.params.id);

        res.json({ status: "Comentario Eliminado" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al eliminar el comentario" });
    }
});

const userModel = require("../models/UserModel");
const publicationModel = require("../models/PublicationModel");

//Comentarios por publicacion

router.get("/comentarios/publicacion/:id", async (req, res)=>{
    try {
        const comments= await commentModel.find({publicacion_id: req.params.id});

        if (!comments) {
            return res.status(404).json({ status: "Comentarios no encontrados" });
        }

        // Mapear los comentarios y los detalles del usuario

        const commentResponse = await Promise.all(comments.map(async (comment) => {
            const user = await userModel.findById(comment.usuario_id);

            return {
                _id: comment._id,
                comentario: comment.comentario,
                fecha: comment.fecha,
                megusta: comment.megusta,
                usuario: {
                    _id: user._id,
                    nombres: user.nombres,
                    apellidos: user.apellidos,
                    correo: user.credencial.correo
                }
            };
        }));

        res.json(commentResponse);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener los comentarios" });
    }
});

//Exportamos el Controlador
module.exports = router;
