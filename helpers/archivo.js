const fs = require('fs');

const archivo = './db/data.json'

const guardarDB = ( data ) => {

    //METODO DE JSON : stringify convierte un Objeto a su version valida de json en string 
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = () => {

    if(!fs.existsSync(archivo)) return null;

    const info = fs.readFileSync(archivo, { encoding : 'utf-8'});
    // Método JSON inverso a stringify: convierte un string en JSON
    const data = JSON.parse(info);
    return data;
}

module.exports = {
    guardarDB,
    leerDB
}