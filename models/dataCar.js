var mongoose = require('mongoose')
var Schema = mongoose.Schema

var dataCarSchema = new Schema(
    { FordMustang: Number,
    DodgeChallenger: Number,
    MazdaMiata: Number,
    ChevroletCamaro: Number
    }
)

var ModelClass = mongoose.model('dataCar', dataCarSchema)
module.exports = ModelClass