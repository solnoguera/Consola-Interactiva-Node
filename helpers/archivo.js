const fs = require('fs');

const guardarDB = ( data ) => {

    const archivo = './db/data.json'
    //METODO DE JSON : stringify
    fs.writeFileSync(archivo, JSON.stringify(data));
}

module.exports = {
    guardarDB
}