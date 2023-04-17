const kuliah = require("../models/kuliah")

class kuliahApi{
    constructor(){
        this.getAllAlumniKuliah =  async (req,res) => {
            try{
                const allKuliahData = await kuliah.model.aggregate([
                    {
                        $match: {
                            universitas: {
                                $regex: req.query.search || '.*'
                            }
                        }
                        
                    },   
                    {
                        $sort: {
                            "id_universitas":1
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
                            id_universitas:1,
                            universitas:1,
                            alamat:1,
                            jumlah_alumni:1
                        }
                    }
                ])

                res.json({
                    status: true,
                    message: "Data loaded successfully",
                    data: allKuliahData
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

        this.findAlumniKuliah = async (req,res) =>{
            try{
                const params = req.params.id
                const getFindAlumniKuliah = await kuliah.model.findById(params)
                res.json({
                    status: true,
                    message: "Data loaded successfully",
                    data: getFindAlumniKuliah
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


        this.addAlumniKuliah = async (req,res) => { 
            try{
                if(!req.body.nisn,!req.body.universitas,!req.body.alamat){
                    return res.status(400).send({Message:"Silahkan isi data dengan lengkap"})
                }
                else{
                    const universitasCount  = await kuliah.model.find().count()

                    const addAlumniKuliah = await kuliah.model.create({
                        id_universitas : "univ-" + (parseInt( universitasCount) + 1),
                        universitas : req.body.universitas,
                        alamat : req.body.alamat

                    })
                    res.json({
                        status: true,
                        message: "Data posted successfully",
                        data: addAlumniKuliah
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

        this.updateAlumniKuliah = async (req,res) => {
            try{
                if(!req.body.universitas,!req.body.alamat){
                    res.status(400).send({Message:"Silahkan isi data dengan lengkap"})
                }
                else{
                    const addAlumniKuliah = await kuliah.model.findByIdAndUpdate(req.params.id,{
                        id_universitas : req.body.id_universitas,
                        universitas : req.body.universitas,
                        alamat : req.body.alamat

                    })
                    res.json({
                        status: true,
                        message: "Data update successfully",
                        data: addAlumniKuliah
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

        this.updateAlumniKuliahbyname = async (req,res) => {
            try{
                if(!req.body.jumlah){
                    res.status(400).send({Message:"Silahkan isi data dengan lengkap"})
                }
                else{
                    const jumlahAlumniUniv =  await kuliah.model.find({id_universitas:req.params.name},{"jumlah_alumni":1, "_id":0})
                    const finaljumlah =  {...jumlahAlumniUniv}
                    const jumlahAlumniKuliah = await kuliah.model.findOneAndUpdate({id_universitas:req.params.name},{
                        jumlah_alumni:  (parseInt(Object.keys(finaljumlah)[0])  + 1)

                })
                    res.json({
                        status: true,
                        message: "Data update successfully",
                        data:    jumlahAlumniKuliah
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

        this.deleteAlumniKuliah = async (req, res) => {
            try{
                const deleteAlumniKuliah = await kuliah.model.findByIdAndDelete(req.params.id)
                res.json({
                    status: true,
                    message: "Data deleted successfully",
                    data: deleteAlumniKuliah
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