const mongoose = require("mongoose")

class auth{
    constructor(){
        this.userSchema = new mongoose.Schema({
            email: {
                type: String,
                unique: [true, "email already exists in database!"],
                lowercase: true,
                trim: true,
                required: [true, "email not provided"],
                validate: {
                  validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                  },
                  message: '{VALUE} is not a valid email!'
                }
            },
            nip:Number,
            nama:String,
            jabatan:String,
            no_hp:String,
            jenis_kelamin:String,
            password: {
                type: String,
                required: true
              },
            

            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
                default: Date.now
            }
        })
        this.model = mongoose.model('user', this.userSchema)
    }
}

module.exports = new auth();