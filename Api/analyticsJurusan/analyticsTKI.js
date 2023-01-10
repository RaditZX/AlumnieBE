const alumni = require('../../models/alumni')

class analyticsTKIAPI{
    constructor(){
        this.getanalyticsTKI = async (req,res) => {
            try{
                //RPL
                const getAnalyticsRPL1 = await alumni.model.find({kelas:'634faa8be80623c742c1245e'}).count()
                const getAnalyticsRPL2 = await alumni.model.find({kelas:'6341c2c2564f1b98800765c2'}).count()

                //MM
                const getAnalyticsMM1 = await alumni.model.find({kelas:'634faaa2e80623c742c12461'}).count()
                const getAnalyticsMM2 = await alumni.model.find({kelas:'634faaa5e80623c742c12464'}).count()

                //Tkj
                const getAnalyticsTKJ1 = await alumni.model.find({kelas:'634faaace80623c742c12467'}).count()
                const getAnalyticsTKJ2 = await alumni.model.find({kelas:'634faaafe80623c742c1246a'}).count()

                res.json({
                    status: true,
                    message: "Data loaded successfully",
                    data:
                        {
                            RPL: getAnalyticsRPL1  + getAnalyticsRPL2,
                            MM : getAnalyticsMM1 + getAnalyticsMM2,
                            TKJ : getAnalyticsTKJ1 + getAnalyticsTKJ2
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

module.exports = new analyticsTKIAPI();