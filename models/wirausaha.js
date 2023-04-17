const mongoose = require("mongoose")

class wirausaha{
    constructor(){
        this.wirausahaSchema = new mongoose.Schema({
            id_wirausaha : String,
            wirausaha : String,
            bidang : String,
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

        this.model = mongoose.model("wirausaha",this.wirausahaSchema)
    }
}

module.exports = new wirausaha();