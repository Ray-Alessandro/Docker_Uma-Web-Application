const mongoose = require("mongoose");

const userSchema =  new mongoose.Schema(
    {
        _id: Number,
        nombres: {type:String},
        apellidos: {type:String},
        telefono: {type:String},
        credencial: {
            correo: {type:String},
            password: {type:String},
        },
        localidad: {
            direccion: {type:String},
            ciudad: {type:String},
            pais: {type:String},
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
);

//Exportamos el modelo
const UserModel = mongoose.model("usuarios", userSchema);

module.exports = UserModel;
