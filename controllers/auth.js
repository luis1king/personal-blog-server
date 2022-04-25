const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt');
 
const register = async(req, res = response ) => {

    const { email, password } = req.body;
    

    try {
        let existingUser = await User.findOne({ email });

        if ( existingUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El user ya existe'
            });
        }

        user = new User( req.body );
        user.role = 'admin';
        user.active = false;
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
        // Save the user
        await user.save();

         //Generar JWT
        const token = await generarJWT( user.id, user.name );
        res.status(201).json({
            ok: true,
            msg: "user registered",
            // uid: user.id,
            // user: `${user.firstName} ${user.lastName}`,
            token,
            user
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const login = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'El user no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Si las contraseñas hacen match, generamos JSON web token
        // Generar JWT
        
        const token = await generarJWT( user.id, user.firstName, user.lastName );
        res.json({
            ok: true,
            uid: user.id,
            user: `${user.firstName} ${user.lastName}`,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}


const revalidarToken = async (req, res = response ) => {

    const { uid, firstName, lastName} = req;

    // Generar JWT
    const token = await generarJWT( uid, firstName, lastName );

    res.json({
        ok: true,
        uid,
        user:`${firstName} ${lastName}`,
        token
    })
}


module.exports = {
    register,
    login,
    revalidarToken
}