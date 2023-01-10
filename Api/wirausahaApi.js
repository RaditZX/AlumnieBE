const wirausaha = require("../models/wirausaha")

class wirausahaApi{
    constructor(){
        this.getAllAlumniWirausaha =  async (req,res) => {
            try{
                const allWirausahaData = await wirausaha.model.find()

                res.json({
                    status: true,
                    message: "Data loaded successfully",
                    data: allWirausahaData
                }) 
            }
            catch(err){
                res.json({
                    status: false,
                    message: "Data not found",
                    data: null,
                    error : err
                })
            }
        }

        this.findWirausaha = async (req,res) =>{
            try{
                const params = req.params.id
                const getFindWirausaha = await wirausaha.model.findById(params)
                res.json({
                    status: true,
                    message: "Data loaded successfully",
                    data: getFindWirausaha
            }) 
            }catch(err){
                res.json({
                    status: false,
                    message: "Data not found",
                    data: null,
                    error : err
                })
            }
        }

        this.addAlumniWirausaha = async (req,res) => { 
            try{
                if(!req.body.wirausaha,!req.body.alamat){
                    res.status(400).send({Message:"Silahkan isi data dengan lengkap"})
                }
                else{
                    const wirausahaCount  = await wirausaha.model.find({}).count()

                    const addAlumniWirausaha = await wirausaha.model.create({
                        id_wirausaha : "wirausaha-" + (parseInt( wirausahaCount) + 1),
                        wirausaha : req.body.wirausaha,
                        alamat : req.body.alamat

                    })
                    res.json({
                        status: true,
                        message: "Data posted successfully",
                        data: addAlumniWirausaha
                    }) 
                }
            }
            catch(err){
                res.json({
                    status: false,
                    message: "Data failed to post",
                    data: null,
                    error : err
                })
            }
        }

        this.updateAlumniWirausaha = async (req,res) => {
            try{
                if(!req.body.wirausaha,!req.body.alamat){
                    res.status(400).send({Message:"Silahkan isi data dengan lengkap"})
                }
                else{
                    const updateAlumniWirausaha = await perusahaan.model.findByIdAndUpdate(req.params.id,{
                        id_wirausaha : req.body.id_perusahaan,
                        wirausaha : req.body.perusahaan,
                        alamat : req.body.alamat

                    })
                    res.json({
                        status: true,
                        message: "Data posted successfully",
                        data: updateAlumniWirausaha
                    }) 
                }
            }
            catch(err){
                res.json({
                    status: false,
                    message: "Data failed to post",
                    data: null,
                    error : err
                })
            }
        }

        this.deleteAlumniWirausaha = async (req, res) => {
            try{
                const deleteAlumniWirausaha = await wirausaha.model.findByIdAndDelete(req.params.id)
                res.json({
                    status: true,
                    message: "Data deleted successfully",
                    data: deleteAlumniWirausaha
                }) 
            }
            catch (err) {
                res.json({
                    status: false,
                    message: "Data failed to delete",
                    data: null,
                    error : err
                })
            }
        }
    }
}

module.exports = new wirausahaApi()