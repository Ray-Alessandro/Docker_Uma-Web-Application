const mongoose = require("mongoose");
//entorne de produccion, cuando hablen los contenedores
//mongoose.connect("mongodb://localhost:27019/Uma_Database")
mongoose.connect("mongodb://database/Uma_Database")
.then
(
    db => console.log("DB is connected to", db.connection.host)
).catch
(
    err => console.error(err)
);
