const mongoose  = require("mongoose")

const commentSchema = new mongoose.Schema(
    {
        _id: { type: Number },
        comentario: { type: String },
        fecha: { type: Date },
        usuario_id: { type: Number },
        publicacion_id: { type: Number },
        megusta: { type: Number },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

// Exportamos el modelo
const CommentModel = mongoose.model("comentarios", commentSchema);
module.exports = CommentModel;
