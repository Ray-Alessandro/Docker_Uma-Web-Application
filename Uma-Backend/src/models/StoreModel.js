const mongoose  = require("mongoose")

const storeSchema = new mongoose.Schema(
    {
        _id: {type: Number},
        nombre: {type: String},
        calificacion: {type: Number},
        imagen: {type: String},
        localidad: {
            direccion: {type:String},
            ciudad: {type:String},
            pais: {type:String},
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

//exportamos el modelo
const StoreModel = mongoose.model("tiendas", storeSchema)
module.exports = StoreModel;

