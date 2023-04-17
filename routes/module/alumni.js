var alumniAPI = require('../../Api/alumniApi')
const multer = require('multer');
var path = require('path');
const storage = multer.diskStorage({
    destination: function (req,res,cb){
      cb(null,'./public/images')
    },
    filename: function(req,file,cb){
      cb(
        null,
        path.parse(file.originalname).name + '-' + Date.now() + path.extname(file.originalname)
      )
    }
  })
  
  const upload = multer({
    storage: storage,
  })
/* GET Alumni data. */
module.exports = function(router,acces_token){
    router.get('/alumni/alumniData',acces_token.verifyToken, alumniAPI.getAlmuni);
    router.get('/alumni/alumniSearchData/:id',acces_token.verifyToken, alumniAPI.findAlumni)
    router.post('/alumni/addAlumni',upload.single('image'),acces_token.verifyToken,alumniAPI.addAlumni);
    router.put('/alumni/updateAlumni/:id',acces_token.verifyToken, alumniAPI.updateAlumni)
    router.delete('/alumni/deleteAlumni/:id',acces_token.verifyToken,alumniAPI.deleteAlumni)
}
