const alumni = require("../models/alumni")


class alumniApi{
    constructor(){
        
        this.getAlmuni = async (req,res) => {
            var search = req.query.nama
            try {
                const allAlumni = await alumni.model.aggregate([{
                    $lookup : {
                        from:"kelas",
                        localField:"kelas",
                        foreignField:"_id",
                        as:"Kelas",
                    }
                    
                },
                {
                    $lookup : {
                        from:"universitas",
                        localField : "status",
                        foreignField : "id_universitas",
                        as: "universitas"
                    }

                },
                {
                    $lookup : {
                        from:"perusahaan",
                        localField : "status",
                        foreignField : "id_perusahaan",
                        as: "perusahaan"
                    }

                },
                {
                    $lookup : {
                        from:"wirausaha",
                        localField : "status",
                        foreignField : "id_wirausaha",
                        as: "wirausaha"
                    }

                },
                {
                    $match: {
                        nama: {
                            $regex: search|| '.*'
                        }
                    }
                    
                },   
                {
                    $sort: {
                        "nisn":1
                    }
                } , 
                {
                    $project : {
                        nisn : 1,
                        nama : 1,
                        angkatan : 1,
                        jenis_kelamin : 1,
                        no_hp : 1,
                        Kelas : 1,
                        universitas:1,
                        perusahaan:1,
                        wirausaha:1,

                    }
                }
            
            ]);
            res.json({
                status: true,
                message: "Data loaded successfully",
                data: allAlumni
            }) 
            }
            catch (err) {
                res.json({
                    status: false,
                    message: "Data not found",
                    data: null,
                    error : err
                })
            }

        }

        this.findAlumni = async (req,res) =>{
            try{
                const params = req.params.id
                const getFindAlumni = await alumni.model.findById(params)
                res.json({
                    status: true,
                    message: "Data loaded successfully",
                    data: getFindAlumni
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

    
        

        this.addAlumni = async (req, res) => {
            try {
                const nisnChecker = await alumni.model.findOne({nisn: req.body.nisn}).count();

                if( nisnChecker !== 0 ){
                    res.status(400).send({message:"Mohon maaf nisn yang anda masukan telah terdaftar silahkan periksa lagi nisn anda"})
                }

                else if(!req.body.nisn,!req.body.nama,!req.body.kelas,!req.body.angkatan,!req.body.status,!req.body.jenis_kelamin,!req.body.no_hp){
                    res.status(400).send({message:"Silahkan isi data dengan lengkap"})
                }
                
                else{
                    const newAlumni = await alumni.model.create({
                        nisn :  req.body.nisn,
                        nama : req.body.nama,
                        kelas :  req.body.kelas,
                        angkatan :  req.body.angkatan,
                        status : req.body.status,
                        jenis_kelamin : req.body.jenis_kelamin,
                        no_hp : req.body.no_hp
                    })
                    newAlumni.save()

                    res.json({
                        status: true,
                        message: "Data posted successfully",
                        data: newAlumni
                    }) 

                }
            } catch (err) {
                 res.json({
                    status: false,
                    message: "Data failed to post",
                    data: null,
                    error : err
                })
            }
        }

        this.updateAlumni = async (req, res) => {
            
            if(!req.body.nisn,!req.body.nama,!req.body.kelas,!req.body.angkatan,!req.body.status,!req.body.jenis_kelamin,!req.body.no_hp){
                res.status(400).send({message:"Silahkan isi data dengan lengkap"})
            }
            
            else{
                try{
                    const updateAlumni = await alumni.model.findByIdAndUpdate(req.params.id,{
                        nisn :  req.body.nisn,
                        nama : req.body.nama,
                        kelas :  req.body.kelas,
                        angkatan :  req.body.angkatan,
                        status : req.body.status,
                        jenis_kelamin : req.body.jenis_kelamin,
                        no_hp : req.body.no_hp
                    })
                    res.json({
                        status: true,
                        message: "Data updated successfully",
                        data: updateAlumni
                    }) 
                } catch (err) {
                    res.json({
                        status: false,
                        message: "Data failed to update",
                        data: null,
                        error : err
                    })
                }
            }
        }

        this.deleteAlumni = async (req, res) => {
            try{
                const deleteAlumni = await alumni.model.findByIdAndDelete(req.params.id)
                res.json({
                    status: true,
                    message: "Data deleted successfully",
                    data: deleteAlumni
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

module.exports = new alumniApi()