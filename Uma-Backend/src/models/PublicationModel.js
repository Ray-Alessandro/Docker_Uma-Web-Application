const mongoose  = require("mongoose")

const publicacionSchema = new mongoose.Schema(
    {
        _id: {type: Number},
        titulo: {type: String},
        descripcion: {type:String},
        fecha: {type:Date},
        imagenes: {type:[String]},
        tienda_id: {type:Number},
        producto_id: {type:Number}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

//Exportamos el modelo
const modelPublicacion = mongoose.model("publicaciones", publicacionSchema)
module.exports = modelPublicacion;
