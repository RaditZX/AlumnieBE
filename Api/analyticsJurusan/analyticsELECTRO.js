const alumni = require('../../models/alumni')

class analyticsELEKTROAPI{
    constructor(){
        this.getanalyticsELEKTRO = async (req,res) => {
            try{
                //AV
                const getAnalyticsAV1 = await alumni.model.find({kelas:'63534b1c0a1c4865628523ae'}).count()
                const getAnalyticsAV2 = await alumni.model.find({kelas:'63534b200a1c4865628523b1'}).count()

                res.json({
                    status: true,
                    message: "Data loaded successfully",
                    data:
                        {
                            AV: getAnalyticsAV1  + getAnalyticsAV2,
                          
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

module.exports = new analyticsELEKTROAPI();