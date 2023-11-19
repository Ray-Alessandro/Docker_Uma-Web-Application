const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
    {
        _id: { type: Number },
        reaccion: { type: Number },
        fecha: { type: Date },
        usuario_id: { type: Number },
        publicacion_id: { type: Number },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Exportamos el modelo
const ReactionModel = mongoose.model("reacciones", reactionSchema);
module.exports = ReactionModel;