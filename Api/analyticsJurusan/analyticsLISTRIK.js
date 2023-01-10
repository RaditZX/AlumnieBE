const alumni = require('../../models/alumni')

class analyticsLISTRIKAPI{
    constructor(){
        this.getanalyticsLISTRIK = async (req,res) => {
            try{
                //TOI
                const getAnalyticsTOI1 = await alumni.model.find({kelas:'634faab9e80623c742c1246d'}).count()
                const getAnalyticsTOI2 = await alumni.model.find({kelas:'634faabde80623c742c12470'}).count()

                //TITL
                const getAnalyticsTITL1 = await alumni.model.find({kelas:'6351e9bfc287d6a38b6e1f83'}).count()
                const getAnalyticsTITL2 = await alumni.model.find({kelas:'6351e9c3c287d6a38b6e1f86'}).count()


                res.json({
                    status: true,
                    message: "Data loaded successfully",
                    data:
                        {
                            TOI: getAnalyticsTOI1  + getAnalyticsTOI2,
                            TITL : getAnalyticsTITL1 + getAnalyticsTITL2,
                          
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

module.exports = new analyticsLISTRIKAPI();