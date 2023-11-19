const mongoose  = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        _id: {type: Number},
        nombre: {type: String},
        precio: {type: Number},
        descripcion: {type: String},
        categoria: {type: [String]},

    },
    {
        timestamps: true,
        versionKey: false,
    }
)

//exportamos el modelo
const modelProduct = mongoose.model("productos", productSchema)
module.exports = modelProduct;
