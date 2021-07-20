//Importamos el metido v4 y lo renombramos a nuestro gusto
const { v4 } = require('uuid');

class Tarea {

    id = '';
    descripcion = '';
    date = '';
    completado = false;

    constructor(descripcion){
        this.descripcion = descripcion;
        //Utilizamos el método que importamos, el cual nos devuelve el ID único.
        this.id = v4()

    }


}

//Lo hacemos así sin llaves, para no tener que importarlo ni hacerle desestructuración. Eso lo dejamos para métodos
module.exports = Tarea;