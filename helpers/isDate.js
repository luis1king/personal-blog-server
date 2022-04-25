const moment = require('moment')

const isDate = (value) => {
    //Si el valñor no existe retorna false
    if (!value) {
        return false
    }

    const fecha = moment(value);
    if (fecha.isValid()) {
        return true;
    } else {
        return false;
    }
}

module.exports ={isDate};