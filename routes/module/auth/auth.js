var authAPI = require('../../../Api/Auth/auth')


module.exports = function(router,acces_token){
    router.post('/auth/signin', authAPI.signIN);
    router.post('/auth/signup', authAPI.signUp);
    router.get('/auth/getrole/:id',acces_token.verifyToken, authAPI.getRole)
    router.put('/user/updateUser/:id',acces_token.verifyToken,authAPI.updateUser)
    router.get('/user/userSearchData/:id',acces_token.verifyToken,authAPI.findUser)
}


