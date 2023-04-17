const alumni = require('../../models/alumni')
const date = new Date();

class analyticsStatusAPI{
    constructor(){
        this.getStatusAnalytics = async (req,res) => {
            try{
                const getKuliahAnalytics = await alumni.model.find({status:{"$regex": /univ/i }}).count()
                const getKerjahAnalytics = await alumni.model.find({status:{"$regex": /perusahaan/i }}).count()
                const getWirausahaAnalytics = await alumni.model.find({status:{"$regex": /wirausaha/i }}).count()
                const getTungguAnalytics = await alumni.model.find({status:{"$regex": /Masa Tunggu/i }}).count()


                res.json({
                    status: true,
                    message: "Data loaded successfully",
                    data: {
                        kuliah : getKuliahAnalytics,
                        kerja : getKerjahAnalytics,
                        wirausaha : getWirausahaAnalytics,
                        masa_tunggu:getTungguAnalytics
                    }      
                }) 
            }
            catch(err){
                res.json({
                    status: false,
                    message: "Data not found",
                    data: null
                })
            }
        }

        this.statusProdi = async (req,res) =>{
            try{
                var TKI = await alumni.model.find({prodi:{"$regex": /TKI/i  }}).count()
                var Elek = await alumni.model.find({prodi:{"$regex": /Elektronika/i }}).count()
                var listrik = await alumni.model.find({prodi:{"$regex": /Listrik/i }}).count()
                res.json({
                    status: true,
                    message: "Data loaded successfully",
                    data: {
                        tki : TKI,
                        elektronika : Elek,
                        listrik: listrik
                    }
                }) 
            }catch(err){
                res.json({
                    status: false,
                    message: "Data not found",
                    data: err
                })
            }


        }

        this.jumlahAlumniAnalytics = async (req,res) => {
            try{
                var state1 = parseInt(date.getFullYear())
                var state2 = state1 - 1
                var state3 = state2 - 1
                var state4 = state3 - 1
                var state5 = state4 - 1 
                var state6 = state5 - 1

                var tahun1 = await alumni.model.find({angkatan:{$eq:state1}}).count()
                var tahun2 = await  alumni.model.find({angkatan:{$eq:state2}}).count()
                var tahun3 = await  alumni.model.find({angkatan:{$eq:state3}}).count()
                var tahun4 = await  alumni.model.find({angkatan:{$eq:state4}}).count()
                var tahun5 = await  alumni.model.find({angkatan:{$eq:state5}}).count()
                var tahun6 = await  alumni.model.find({angkatan:{$eq:state6}}).count()

                res.json({
                    status: true,
                    message: "Data loaded successfully",
                    data: {
                        tahunPertama : tahun6,
                        tahunKedua : tahun5,
                        tahunKetiga : tahun4,
                        tahunKeempat : tahun3,
                        tahunKelima : tahun2,
                        tahunKeenam : tahun1,
                    }      
                }) 

            }catch(err){
                res.json({
                    status: false,
                    message: "Data not found",
                    data: null
                })

            }

        }
    }
}

module.exports = new analyticsStatusAPI();