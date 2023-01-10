const mongoose = require("mongoose")

class kelas {
    constructor(){
        this.kelasSchema = new mongoose.Schema({
            nama_kelas : String,
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
                default: Date.now
            }
        })

        this.model = mongoose.model("kelas", this.kelasSchema)
    }
}
module.exports = new kelas() ; 