var wirausahaAPI = require('../../Api/wirausahaApi')

module.exports  = function(router,acces_token){
    router.get('/wirausaha/wirausahaData',acces_token.verifyToken, wirausahaAPI.getAllAlumniWirausaha )
    router.get('/wirausaha/wirausahaSearchData/:id',acces_token.verifyToken, wirausahaAPI.findWirausaha )
    router.post('/wirausaha/addWirausaha',acces_token.verifyToken, wirausahaAPI.addAlumniWirausaha)
    router.put('/wirausaha/updateWirausaha/:id',acces_token.verifyToken, wirausahaAPI.updateAlumniWirausaha)
    router.put('/kuliah/updateWirausahabyname/:name',acces_token.verifyToken, wirausahaAPI.updateAlumniWirausahabyname)
    router.delete('/wirausaha/deleteWirausaha/:id',acces_token.verifyToken, wirausahaAPI.deleteAlumniWirausaha)
}