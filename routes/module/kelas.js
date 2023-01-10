var kelasAPI = require('../../Api/kelasApi');

module.exports = function(router,acces_token){
    router.get('/kelas/kelasData',acces_token.verifyToken, kelasAPI.getKelas)
    router.post("/kelas/addKelas",acces_token.verifyToken, kelasAPI.addKelas)
    router.put('/kelas/updateKelas/:id',acces_token.verifyToken, kelasAPI.updateKelas)
    router.delete('/kelas/deleteKelas/:id',acces_token.verifyToken, kelasAPI.deleteKelas)
}


