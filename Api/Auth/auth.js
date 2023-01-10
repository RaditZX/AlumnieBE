const User = require('../../models/auth')
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

class authAPI {
  constructor() {
    this.signIN = async (req, res) => {
      try {
        User.model.findOne({
            email: req.body.email
          })
          .exec((err, user) => {
            if (err) {
              res.status(500)
                .send({
                  message: err
                });
              return;
            }
            if (!user) {
              return res.status(404)
                .send({
                  message: "User Not found."
                });
            }

            //comparing passwords
            var passwordIsValid = bcrypt.compareSync(
              req.body.password,
              user.password
            );
            // checking if password was valid and send response accordingly
            if (!passwordIsValid) {
              return res.status(401)
                .send({
                  accessToken: null,
                  message: "Invalid Password!"
                });
            }
            //signing token with user id
            var token = jwt.sign({
              id: user.id
            }, "jwtsecret", {
              expiresIn: 86400
            });

            //responding to client request with user profile success message and  access token .
            res.status(200)
              .send({
                status: true,
                message: "Login successfull",
                data: {
                  id: user._id,
                  email: user.email,
                },
                accessToken: token,
              });
          });
      } catch (err) {

      }
    }

    this.signUp = async (req, res) => {
      const user = await new User.model({
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, 8)
      });

      user.save((err, user) => {
        if (err) {
          res.status(500)
            .send({
              message: err
            });
          return;
        } else {
          res.status(200)
            .send({
              message: "User Registered successfully"
            })
        }
      });
    }

    this.getRole = async (req, res) => {
      try {
        jwt.verify(req.params.id.split(' ')[1], "jwtsecret", function (err, decode) {
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
              } else {
                res.send(user)
              }
            })
        })

        User.model.find({
          _id: id
        })
        res.jsoN(getRole)
      } catch (err) {
        res.send(err)
      }

    }

    this.updateUser = async (req, res) => {
      try {
        const updateUser = await User.model.findByIdAndUpdate(req.params.id, {
          nip: req.body.nip,
          nama: req.body.nama,
          jabatan: req.body.jabatan,
          jenis_kelamin: req.body.jenis_kelamin,
          no_hp: req.body.no_hp
        })
        res.json({
          status: true,
          message: "Data updated successfully",
          data: updateUser
        })
      } catch (err) {
        res.json({
          status: false,
          message: "Data failed to update",
          data: null,
          error: err
        })
      }
    }

    this.findUser = async (req,res) =>{
      try{
          const params = req.params.id
          const getFindUser = await User.model.findById(params)
          res.json({
              status: true,
              message: "Data loaded successfully",
              data: getFindUser
      }) 
      }catch(err){
          res.json({
              status: false,
              message: "Data not found",
              data: null,
              error : err
          })
      }
  }
  }
}

module.exports = new authAPI();