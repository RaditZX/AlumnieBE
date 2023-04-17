const kelas = require("../models/kelas")


class kelasApi{
    constructor(){
        
        this.getKelas = async (req,res) => {
            try {
                const allKelas = await kelas.model.find();
                res.status(200).json(allKelas);
            }
            catch (err) {
                res.status(500).json(err);
            }

        }


        this.addKelas = async (req, res) => {
            try {
                if(!req.body.nama_kelas){
                    res.status(400).send('silahkan isi data dengan lengkap')
                }
                else{
                    const newKelas = await kelas.model.create({
                        nama_kelas : req.body.nama_kelas
                    })
                    newKelas.save()
                    res.status(200).json(newKelas)
                }
            } 
            catch (err) {
                res.status(500).json(err)
            }
        }

        this.updateKelas = async (req, res) => {
            try{
                if(!req.body.nama_kelas){
                    res.status(400).send('silahkan isi data dengan lengkap')
                }
                else{
                    const updateKelas = await kelas.model.findByIdAndUpdate(req.params.id,{
                        nama_kelas : req.body.nama_kelas
                    })
                    res.status(200).json( updateKelas)
                }
            } catch (err) {
                res.status(500).json(err)
            }
        }

        this.deleteKelas = async (req, res) => {
            try{
                const deleteKelas = await kelas.model.findByIdAndDelete(req.params.id)
                res.status(200).json(deleteKelas)
            }
            catch (err) {
                res.status(500).json(err)
            }
        }
    }
}

module.exports = new kelasApi()