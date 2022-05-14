/*
    Rutas de Usuarios 
*/
const { Router } = require('express');
const { getUser, getActiveUser, uploadAvatar, getAvatar, updateUser } = require('../controllers/users');
const { validarJWT } = require('../middlewares/validar-jwt');
const multypart = require('connect-multiparty')


// Upload avatar middleware
const mwUpload = multypart({uploadDir: '../uploads/avatar'})
const router = Router();

// Get Avatar url
router.get('/get-avatar/:avatarName', getAvatar);

// Update User
router.put('/updateuser/:id',validarJWT, updateUser);

// Get all users
router.get('/getusers',validarJWT, getUser);

// Get Active users
router.get('/getactive',validarJWT, getActiveUser);


// Upload AvatarName
router.put('/upload-avatar/:id',[mwUpload, validarJWT], uploadAvatar);


module.exports = router;