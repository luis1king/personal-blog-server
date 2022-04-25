/*
Todo Routes
/api/todos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const {validarJWT} = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos');
const {getEvento,crearEvento,actualizarEvento,borrarEvento} = require('../controllers/eventsControllers')
const {isDate}  = require('../helpers/isDate') 


const router = Router();


//Todas tienen que pasar por la validacion del JWT
//En ve de usar 4x validar token en las rutas podemos crear un middleware  router.get('/',validarJWT, getEvento)
//* Al usar esta función hacemos que todas las demas rutas que esten por debajo, van a usar (validarJWT) 
router.use(validarJWT); 


// Obtener eventos
router.get('/', getEvento)

//Crear un nuevo evento
router.post('/', [
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('date','La fecha es obligatorio').custom(isDate),
    validarCampos
],
crearEvento)

//Crear un nuevo evento
router.put('/:id', actualizarEvento)

//Borrar Evento
router.delete('/:id', borrarEvento)


module.exports = router;