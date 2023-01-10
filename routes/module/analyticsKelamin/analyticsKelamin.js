var jk = require("../../../Api/analyticsKelamin/analyticsKelamin")

module.exports = function(router,acces_token){
    router.get('/analyticsKelamin/analyticsKelamin',acces_token.verifyToken, jk.getkelaminAnalytics);
  
}
