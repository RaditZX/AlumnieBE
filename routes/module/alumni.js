var alumniAPI = require('../../Api/alumniApi')

/* GET Alumni data. */
module.exports = function(router,acces_token){
    router.get('/alumni/alumniData',acces_token.verifyToken, alumniAPI.getAlmuni);
    router.get('/alumni/alumniSearchData/:id',acces_token.verifyToken, alumniAPI.findAlumni)
    router.post('/alumni/addAlumni',acces_token.verifyToken,alumniAPI.addAlumni);
    router.put('/alumni/updateAlumni/:id',acces_token.verifyToken, alumniAPI.updateAlumni)
    router.delete('/alumni/deleteAlumni/:id',acces_token.verifyToken,alumniAPI.deleteAlumni)
}
