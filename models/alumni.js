const mongoose = require("mongoose")

class alumni{
    constructor(){
        this.alumniSchema = new mongoose.Schema({
            nisn : Number,
            nama : String,
            kelas : {type:mongoose.Schema.Types.ObjectId},
            angkatan : Number,
            jenis_kelamin : String,
            no_hp : Number,
            status : String,
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
                default: Date.now
            }
        })
        this.model = mongoose.model('alumni', this.alumniSchema)
    }
}

module.exports = new alumni();