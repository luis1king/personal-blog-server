const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarRole = ( req, res = response, next ) => {

    // x-token headers
    const token = req.header('x-token');
    
    
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    } 
    
    const { uid } = jwt.verify(
        token,
        process.env.SECRET_JWT_SEED
    );
if (uid === '62764989c4bd9930ec435307') {

    return res.status(200).json({
        ok: true,
        msg: 'Tienes permiso'
    });
}

        try {
            const { uid } = jwt.verify(
                token,
                process.env.SECRET_JWT_SEED
            );
            console.log(uid)
           req.uid = uid;
    
        } catch (error) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permiso'
            });
        }

    next();
}


module.exports = {
    validarRole
}
