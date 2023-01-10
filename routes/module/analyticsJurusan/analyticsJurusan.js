var analyticsTKIAPI = require('../../../Api/analyticsJurusan/analyticsTKI')
var analyticsLISTRIKAPI = require('../../../Api/analyticsJurusan/analyticsLISTRIK');
const analyticsELECTRO = require('../../../Api/analyticsJurusan/analyticsELECTRO');


module.exports = function(router,acces_token){
    router.get('/analyticsJurusan/analyticsTKI',acces_token.verifyToken, analyticsTKIAPI.getanalyticsTKI);
    router.get('/analyticsJurusan/analyticsLISTRIK',acces_token.verifyToken, analyticsLISTRIKAPI.getanalyticsLISTRIK);
    router.get('/analyticsJurusan/analyticsELEKTRO',acces_token.verifyToken, analyticsELECTRO.getanalyticsELEKTRO);
}


