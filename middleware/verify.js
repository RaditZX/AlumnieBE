const jwt = require("jsonwebtoken");
User = require("../models/auth");

class verifyToken{
  constructor(){
    this.verifyToken = async (req, res, next) =>{
      try{
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
          jwt.verify(req.headers.authorization.split(' ')[1], "jwtsecret", function (err, decode) {
            if (err) req.user = undefined;
            User.model.findOne({
                _id: decode.id
              })
              .exec((err, user) => {
                if (err) {
                  res.status(500)
                    .send({
                      message: err
                    });
                } 
                // else if (user.role != 'admin'){
                //   res.send('you not permited to acces this API')
                // }
                else {
                  req.user = user;
                  next();
                }
              })
          });
        } else {
          res.status(500).send({
            status: false,
            message: "Invalid Token Client",
        });
        }
    }
    catch(err){
      res.status(500).send({
        status: false,
        message: "Invalid Token Client",
    });

    }
   }
  }
}

module.exports = new verifyToken();