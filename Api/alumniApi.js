const alumni = require("../models/alumni");




class alumniApi {
  constructor() {
    this.getAlmuni = async (req, res) => {
      var search = req.query.nama;
      try {
        const allAlumni = await alumni.model.aggregate([
          {
            $lookup: {
              from: "kelas",
              localField: "kelas",
              foreignField: "_id",
              as: "Kelas",
            },
          },
          {
            $lookup: {
              from: "universitas",
              localField: "status",
              foreignField: "id_universitas",
              as: "universitas",
            },
          },
          {
            $lookup: {
              from: "perusahaans",
              localField: "status",
              foreignField: "id_perusahaan",
              as: "perusahaan",
            },
          },
          {
            $lookup: {
              from: "wirausahas",
              localField: "status",
              foreignField: "id_wirausaha",
              as: "wirausaha",
            },
          },
          {
            $match: {
              nama: {
                $regex: search || ".*",
              },
            },
          },
          {
            $match: {
              status: {
                $regex: req.query.status || ".*",
              },
            },
          },

          {
            $match: {
              angkatan: parseInt(req.query.angkatan) || { $gt: 2021 },
            },
          },
          {
            $sort: {
              nisn: 1,
            },
          },
          {
            $skip:
              (parseInt(req.query.page) - 1) * parseInt(req.query.limit) || 0,
          },
          {
            $limit: parseInt(req.query.limit) || 10,
          },
          // {
          //     $match: {
          //         angkatan : angkatan || '.*'

          //     }
          // },
          {
            $project: {
              nisn: 1,
              nama: 1,
              angkatan: 1,
              no_hp: 1,
              Kelas: 1,
              detail_status: 1,
              status:1,
              prodi:1,
              universitas: 1,
              perusahaan: 1,
              wirausaha: 1,
            },
          },
        ]);
        
        const excelAlumni = await alumni.model.aggregate([
          {
            $lookup: {
              from: "kelas",
              localField: "kelas",
              foreignField: "_id",
              as: "Kelas",
            },
          },
          {
            $lookup: {
              from: "universitas",
              localField: "status",
              foreignField: "id_universitas",
              as: "universitas",
            },
          },
          {
            $lookup: {
              from: "perusahaans",
              localField: "status",
              foreignField: "id_perusahaan",
              as: "perusahaan",
            },
          },
          {
            $lookup: {
              from: "wirausahas",
              localField: "status",
              foreignField: "id_wirausaha",
              as: "wirausaha",
            },
          },
          {
            $sort: {
              nisn: 1,
            },
          },
          {$set:{'Kelas':{$first:'$Kelas.nama_kelas'}}},
          {$set:{'universitas':{$first:'$universitas.universitas'}}},
          {$set:{'perusahaan':{$first:'$perusahaan.perusahaan'}}},
          {$set:{'wirausaha':{$first:'$wirausaha.wirausaha'}}},


          {
            $project: {
              nisn: 1,
              nama: 1,
              angkatan: 1,
              prodi:1,
              Kelas: 1,
              no_hp: 1,
              "universitas": 1,
              perusahaan: 1,
              wirausaha: 1,
              detail_status: 1,
            },
          },
        ]);

        const jumlahAlumni = await alumni.model.find().count()



        res.json({
          status: true,
          excel:excelAlumni,
          message: "Data loaded successfully",
          data: allAlumni,
          jumlah_alumni: jumlahAlumni,

        });
      } catch (err) {
        res.json({
          status: false,
          message: "Data not found",
          data: null,
          error: err,
        });
      }
    };

    this.findAlumni = async (req, res) => {
      try {
        const params = req.params.id;
        const getFindAlumni = await alumni.model.findById(params);
        const getFindAlumniStatus = await alumni.model.aggregate([
          {
            $lookup: {
              from: "universitas",
              localField: "status",
              foreignField: "id_universitas",
              as: "universitas",
            },
          },
          {
            $lookup: {
              from: "perusahaans",
              localField: "status",
              foreignField: "id_perusahaan",
              as: "perusahaan",
            },
          },
          {
            $lookup: {
              from: "wirausahas",
              localField: "status",
              foreignField: "id_wirausaha",
              as: "wirausaha",
            },
          },
          {
            $match: {
              $expr: { $eq: ["$_id", { $toObjectId: params }] },
            },
          },
          {
            $project: {
              universitas: 1,
              perusahaan: 1,
              wirausaha: 1,
            },
          },
        ]);
        res.json({
          status: true,
          message: "Data loaded successfully",
          data: getFindAlumni,
          statusAlumni: getFindAlumniStatus,
        });
      } catch (err) {
        res.json({
          status: false,
          message: "Data not found",
          data: null,
          error: err,
        });
      }
    };

    this.addAlumni = async (req, res) => {
      try {
        var nisnChecker
         if (req.body.nisn !=null){
          nisnChecker = await  alumni.model
          .find({ nisn: req.body.nisn  })
          .count() }
          else{
            nisnChecker=1
          }
        
        

        if ( nisnChecker !== 0 ) {
          return res
            .status(404)
            .send({
              message:
                "Mohon maaf nisn yang anda masukan telah terdaftar silahkan periksa lagi nisn anda",nisn:nisnChecker
            });
        } else if (
          (
          !req.body.nama &&
          !req.body.kelas&&
          !req.body.angkatan&&
          !req.body.status&&
          !req.body.detail_Status&&
          !req.body.prodi&&
          !req.body.no_hp)
        ) {
          return res
            .status(404)
            .send({ message: "Silahkan isi data dengan lengkap" });
        } else {
          const newAlumni = await alumni.model.create({
            nisn: req.body.nisn,
            nama: req.body.nama,
            kelas: req.body.kelas,
            angkatan: req.body.angkatan,
            status: req.body.status,
            image : req.file.filename,
            detail_status: req.body.detail_status,
            prodi: req.body.prodi,
            no_hp: req.body.no_hp,
          });
          newAlumni.save();

          res.json({
            status: true,
            message: "Data posted successfully",
            data: newAlumni,
          });
        }
      } catch (err) {
        res.json({
          status: false,
          message: "Data failed to post",
          data: null,
          error: err,
        });
      }
    };

    this.updateAlumni = async (req, res) => {
      if (
        (
        !req.body.nama,
        !req.body.kelas,
        !req.body.angkatan,
        !req.body.status,
        !req.body.prodi,
        !req.body.no_hp
)
      ) {
        return res
          .status(401)
          .send({ message: "Silahkan isi data dengan lengkap" });
      } else {
        try {
          const updateAlumni = await alumni.model.findByIdAndUpdate(
            req.params.id,
            {
              nisn: req.body.nisn,
              nama: req.body.nama,
              kelas: req.body.kelas,
              angkatan: req.body.angkatan,
              status: req.body.status,
              detail_status: req.body.detail_status,
              prodi: req.body.prodi,
              no_hp: req.body.no_hp,
            }
          );
          res.json({
            status: true,
            message: "Data updated successfully",
            data: updateAlumni,
          });
        } catch (err) {
          res.json({
            status: false,
            message: "Data failed to update",
            data: null,
            error: err,
          });
        }
      }
    };

    this.deleteAlumni = async (req, res) => {
      try {
        const deleteAlumni = await alumni.model.findByIdAndDelete(
          req.params.id
        );
        res.json({
          status: true,
          message: "Data deleted successfully",
          data: deleteAlumni,
        });
      } catch (err) {
        res.json({
          status: false,
          message: "Data failed to delete",
          data: null,
          error: err,
        });
      }
    };
  }
}

module.exports = new alumniApi();
