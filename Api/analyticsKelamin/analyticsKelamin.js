const alumni = require('../../models/alumni')

class analyticsKelaminAPI{
    constructor(){
        this.getkelaminAnalytics = async (req,res) => {
            try{
                const getLakiLakiAnalytics = await alumni.model.find({jenis_kelamin:{"$regex": /L/i }}).count()
                const getPerempuanAnalytics = await alumni.model.find({jenis_kelamin:{"$regex": /P/i }}).count()
            
                res.json({
                    status: true,
                    message: "Data loaded successfully",
                    data: {
                        Pria : getLakiLakiAnalytics,
                        Wanita : getPerempuanAnalytics
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
    }
}

module.exports = new analyticsKelaminAPI();