const {Router} = require('express');
const router = Router();

const userModel = require("../models/UserModel");

//-----------------CRUD USUARIOS-----------------
//#Get
router.get("/usuarios", async (req,res) => {
    const users = await userModel.find();
    res.json(users);
});

//#Post
router.post("/usuarios", async (req, res) => {
     /*Una forma
    const { _id,nombres, apellidos, telefono, credencial, localidad } = req.body;
    const user = new userModel({ _id,nombres, apellidos, telefono, credencial, localidad });
    await user.save();*/
    
    const user = await userModel.create(req.body);
    res.json({status: "Usuario agregado",user});
});

//#Get by id
router.get("/usuarios/:id", async (req, res) => {
    const user = await userModel.findById(req.params.id);
    res.json(user);
});

//#Put
router.put("/usuarios/:id", async (req, res) => {
    await userModel.findOneAndUpdate({_id:req.params.id}, req.body);
    res.json({status: "Usuario Actualizado"});
});

//#Delete
router.delete("/usuarios/:id", async (req, res) => {
    const user = await userModel.findById(req.params.id);
    if(!user){
        return res.status(404).json({status: "Usuario no encontrado"});
    }

    await modelUser.findByIdAndDelete(req.params.id);

    res.json({status: "Usuario Eliminado"});
});

//Exportamos el Controlador
module.exports = router;