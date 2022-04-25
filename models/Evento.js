const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
});

//Con este metodo cambiamos la forma en la que se recibe el id (_id) y extraemos la version del objeto (_v)
EventoSchema.method('toJSON', function(){
    const {__v, _id,...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Evento', EventoSchema );

