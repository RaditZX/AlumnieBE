var kuliahAPI = require('../../Api/kuliahApi')

module.exports  = function(router,acces_token){
    router.get('/kuliah/kuliahData',acces_token.verifyToken, kuliahAPI.getAllAlumniKuliah)
    router.get('/kuliah/kuliahSearchData/:id',acces_token.verifyToken, kuliahAPI.findAlumniKuliah )
    router.post('/kuliah/addKuliah',acces_token.verifyToken, kuliahAPI.addAlumniKuliah)
    router.put('/kuliah/updateKuliah/:id',acces_token.verifyToken, kuliahAPI.updateAlumniKuliah)
    router.delete('/kuliah/deleteKuliah/:id',acces_token.verifyToken, kuliahAPI.deleteAlumniKuliah)
}