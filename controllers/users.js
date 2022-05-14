const { response } = require('express');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');



const getUser = async (req, res = response) => {
   await User.find().then((users) => {
       if (!users) {
           res.status(404).json({
               ok: false,
               msg: 'No hay ningún usuario'
           });
       } else {
           res.status(200).json({
               ok: true,
               users
           });
       }
    })
}

const getActiveUser = async (req, res = response) => {
    const query = req.query
    await User.find({active: query.active}).then((users) => {
        if (!users) {
            res.status(404).json({
                ok: false,
                msg: 'No hay ningún usuario'
            });
        } else {
            res.status(200).json({
                ok: true,
                users
            });
        }
     })
 }

 const updateUser = async (req, res) => {

  let userData = req.body;
  // modificamos el email a minusculas
  userData.email = req.body.email.toLowerCase();
  const id = req.params.id;

    if (userData.password) {
      const salt = bcrypt.genSaltSync();
      userData.password = await bcrypt.hashSync( userData.password, salt );
    }
    
    updatedUser = await User.findByIdAndUpdate(id, userData, {new: true}, (err, userUpdate)=>{
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!userUpdate) {
          res
            .status(404)
            .send({ message: "No se ha encontrado ningun usuario." });
        } else {
          res.status(200).send({ message: "Usuario actualizado correctamente."});
        }
      }

    });
 
}


const uploadAvatar = async (req, res) => {

    const id =  req.params.id;
    await User.findById({ _id: id }, (err, userData) => {
      if (err) {
        res.status(500).json({ 
            ok: false,
            msg: "Error del servidor." 
        });
      } else {
        if (!userData) {
          res.status(404).json({ 
              ok: false,
              msg: "No se ha encontrado ningun usuario." 
            });
        } else {
          let user = userData;
            console.log(req.files);
            if (req.files) {
                let fileExt = req.files.avatar.originalFilename.split('.')[1];
                let fileName = req.files.avatar.path.split("\\")[3];
      
                if (fileExt !== "png" && fileExt !== "jpg") {
                  res.status(400).send({
                    message:
                      "La extension de la imagen no es valida. (Extensiones permitidas: .png y .jpg)"
                  });
                } else {
                  user.avatar = fileName;
                  User.findByIdAndUpdate(
                    { _id: id },
                    user,
                    (err, userResult) => {
                      if (err) {
                        res.status(500).send({ message: "Error del servidor." });
                      } else {
                        if (!userResult) {
                          res
                            .status(404)
                            .send({ message: "No se ha encontrado ningun usuario." });
                        } else {
                          res.status(200).send({ avatarName: fileName });
                        }
                      }
                    }
                  );
                }
            }
        }
      }
    });
  }

const getAvatar = (req, res) => {
    const avatarName = req.params.avatarName;
    const filePath = "../uploads/avatar/" + avatarName;
    const exist = fs.existsSync(filePath)
      if (!exist) {
        res.status(404).json({ msg: "El avatar que buscas no existe." });
      } else {
        res.sendFile(path.resolve(filePath));
      };
  }
  


module.exports = {
    getUser,
    getActiveUser,
    uploadAvatar,
    getAvatar,
    updateUser

}