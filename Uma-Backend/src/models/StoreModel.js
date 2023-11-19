const mongoose  = require("mongoose")

const storeSchema = new mongoose.Schema(
    {
        _id: {type: Number},
        nombre: {type: String},
        calificacion: {type: Number},
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
const modelStore = mongoose.model("tiendas", storeSchema)
module.exports = modelStore;