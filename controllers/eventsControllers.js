const { response } = require('express');
const Evento = require('../models/Evento')


const getEvento = async (req, res = response)=>{

    const eventos = await Evento.find()
                                 .populate('user','firstName');

     res.json({ 
            ok:true,
            msg:'get',
            eventos:eventos
        })
}

const crearEvento = async (req, res = response)=>{

    const evento = new Evento(req.body);

    try {

     evento.user = req.uid;
     const eventoGuardado = await evento.save();
     res.json({ 
        ok:true,
        msg: eventoGuardado
    })
       

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

    //Verificar que tengo el evento
}

const actualizarEvento = async (req, res = response)=>{

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        //Comprueba si el id del evento coincide con la de la BBDD
        const evento = await Evento.findById(eventoId);

        if(!evento){
           return res.status(404).json({
                ok: false,
                msg: 'No existe el evento'
            })
        }

        if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso para editar el evento'
            })
        }


        const newEvent = {
            ...req.body,
            user:uid
        }
        
        //Para recibir el objeto actualizado, usamos {new: true}
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, newEvent, {new: true} );
        res.json({
            ok:true,
            msg: eventoActualizado
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const borrarEvento = async (req, res = response)=>{

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        //Comprueba si el id del evento coincide con la de la BBDD
        const evento = await Evento.findById(eventoId);

        if(!evento){
           return res.status(404).json({
                ok: false,
                msg: 'No existe el evento'
            })
        }

        if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso para eliminar el evento'
            })
        }

        //Para recibir el objeto actualizado, usamos {new: true}
        const eventoEliminado = await Evento.findByIdAndDelete(eventoId) ;
        res.json({
            ok:true,
            msg: 'Evento eliminado'
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

module.exports = {
    getEvento,
    crearEvento,
    actualizarEvento,
    borrarEvento
}