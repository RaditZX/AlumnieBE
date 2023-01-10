const alumni = require('../../models/alumni')

class analyticsStatusAPI{
    constructor(){
        this.getStatusAnalytics = async (req,res) => {
            try{
                const getKuliahAnalytics = await alumni.model.find({status:{"$regex": /univ/i }}).count()
                const getKerjahAnalytics = await alumni.model.find({status:{"$regex": /kerja/i }}).count()
                const getWirausahaAnalytics = await alumni.model.find({status:{"$regex": /wirausaha/i }}).count()

                res.json({
                    status: true,
                    message: "Data loaded successfully",
                    data: {
                        kuliah : getKuliahAnalytics,
                        kerja : getKerjahAnalytics,
                        wirausaha : getWirausahaAnalytics
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

        this.statusTerbanyakAnalytics = async (req,res) =>{
            try{
                var datalumniKuliah = await alumni.model.find({status:{"$regexB": /univ/i }})
                res.json({
                    status: true,
                    message: "Data loaded successfully",
                    data: datalumniKuliah      
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

                var state1 = parseInt(req.query.tahun)
                var state2 = state1 + 1
                var state3 = state2 + 1
                var state4 = state3 + 1
                var state5 = state4 + 1
                var state6 = state5 + 1

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
                        [state1] : tahun1,
                        [state2] : tahun2,
                        [state3] : tahun3,
                        [state4] : tahun4,
                        [state5] : tahun5,
                        [state6] : tahun6,
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