var perusahaanAPI = require('../../Api/perusahaanApi')

module.exports  = function(router,acces_token){
    router.get('/perusahaan/perusahaanData',acces_token.verifyToken, perusahaanAPI.getAllAlumniKerja )
    router.get('/perusahaan/perusahaanSearchData/:id',acces_token.verifyToken,  perusahaanAPI.getFindPerusahaan )
    router.post('/perusahaan/addPerusahaan',acces_token.verifyToken, perusahaanAPI.addPerusahaan)
    router.put('/perusahaan/updatePerusahaan/:id',acces_token.verifyToken, perusahaanAPI.updatePerusahaan)
    router.put('/kuliah/updateKerjabyname/:name',acces_token.verifyToken, perusahaanAPI.updateAlumniKerjabyname)
    router.delete('/perusahaan/deletePerusahaan/:id',acces_token.verifyToken, perusahaanAPI.deletePerusahaan)
}