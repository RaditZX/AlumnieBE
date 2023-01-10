var analyticsStatusAPI = require('../../../Api/analyticsStatus/analyticsStatus')

module.exports = function(router,acces_token){
    router.get('/analyticsStatus/statusAnalytics',acces_token.verifyToken, analyticsStatusAPI.getStatusAnalytics)
    router.get('/analyticsStatus/jumlahAlumniAnalytics',acces_token.verifyToken, analyticsStatusAPI.jumlahAlumniAnalytics)
    router.get('/analyticsStatus/jumlahAlumniKuliahAnalytics',acces_token.verifyToken, analyticsStatusAPI.statusTerbanyakAnalytics)
}


