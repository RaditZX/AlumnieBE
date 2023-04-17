const mongoose = require("mongoose")

class perusahaan{
    constructor(){
        this.perusahaanSchema = new mongoose.Schema({
            id_perusahaan : String,
            perusahaan : String,
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

        this.model = mongoose.model("perusahaan",this.perusahaanSchema)
    }
}

module.exports = new perusahaan();