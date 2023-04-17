const mongoose = require("mongoose")

class Kuliah{
    constructor(){
        this.kuliahSchema = new mongoose.Schema({
            id_universitas : String,
            universitas : String,
            alamat : String,
            jumlah_alumni : Number,
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
                default: Date.now
            }
        })

        this.model = mongoose.model("universitas",this.kuliahSchema)
    }
}

module.exports = new Kuliah();