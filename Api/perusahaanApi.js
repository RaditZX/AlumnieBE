const perusahaan = require("../models/perusahaan")

class kuliahApi{
    constructor(){
        this.getAllAlumniKerja =  async (req,res) => {
            try{
                const allPerusahaanData = await perusahaan.model.aggregate([
                    {
                        $match: {
                            perusahaan: {
                                $regex: req.query.search || '.*'
                            }
                        }
                        
                    },   
                    {
                        $sort: {
                            "id_perusahaan":1
                        }
                    } , 
                    {
                        $skip: ((parseInt(req.query.page) - 1) * parseInt(req.query.limit))  || 0
                    },
                    {
                        $limit: parseInt(req.query.limit) || 10,
                     
                    }, 
                    {
                        $project:{
                            id_perusahaan:1,
                            perusahaan:1,
                            alamat:1,
                            jumlah_alumni:1
                        }
                    }
                ])

                res.json({
                    status: true,
                    message: "Data loaded successfully",
                    data: allPerusahaanData
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

        this.getFindPerusahaan = async (req,res) =>{
            try{
                const params = req.params.id
                const getFindPerusahaan = await perusahaan.model.findById(params)
                res.json({
                    status: true,
                    message: "Data loaded successfully",
                    data: getFindPerusahaan
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

        this.addPerusahaan = async (req,res) => { 
            try{
                if(!req.body.perusahaan,!req.body.alamat){
                    res.status(400).send({Message:"Silahkan isi data dengan lengkap"})
                }
                else{
                    const perusahaanCount  = await perusahaan.model.find({}).count()

                    const addAlumniKerja = await perusahaan.model.create({
                        id_perusahaan : "perusahaan-" + (parseInt( perusahaanCount) + 1),
                        perusahaan : req.body.perusahaan,
                        alamat : req.body.alamat

                    })
                    res.json({
                        status: true,
                        message: "Data posted successfully",
                        data: addAlumniKerja
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

        this.updatePerusahaan = async (req,res) => {
            try{
                if(!req.body.perusahaan,!req.body.alamat){
                    res.status(400).send({Message:"Silahkan isi data dengan lengkap"})
                }
                else{
                    const updateAlumniKerja = await perusahaan.model.findByIdAndUpdate(req.params.id,{
                        id_perusahaan : req.body.id_perusahaan,
                        perusahaan : req.body.perusahaan,
                        alamat : req.body.alamat

                    })
                    res.json({
                        status: true,
                        message: "Data posted successfully",
                        data: updateAlumniKerja
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

        this.updateAlumniKerjabyname = async (req,res) => {
            try{
                if(!req.body.jumlah){
                    res.status(400).send({Message:"Silahkan isi data dengan lengkap"})
                }
                else{
                    const jumlahAlumniKerja =  await perusahaan.model.find({id_perusahaan:req.params.name},{"jumlah_alumni":1, "_id":0})
                    const finaljumlah =  {...jumlahAlumniKerja}
                    const jumlahAlumniBekerja = await perusahaan.model.findOneAndUpdate({id_perusahaan:req.params.name},{
                        jumlah_alumni:  (parseInt(Object.keys(finaljumlah)[0])  + 1)

                })
                    res.json({
                        status: true,
                        message: "Data update successfully",
                        data:    jumlahAlumniBekerja
                    }) 
                }
            }
            catch(err){
                res.json({
                    status: false,
                    message: "Data failed to update",
                    data: null,
                    error : err
                })
            }
        }

        this.deletePerusahaan = async (req, res) => {
            try{
                const deleteAlumniKerja = await perusahaan.model.findByIdAndDelete(req.params.id)
                res.json({
                    status: true,
                    message: "Data deleted successfully",
                    data: deleteAlumniKerja
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

module.exports = new kuliahApi()