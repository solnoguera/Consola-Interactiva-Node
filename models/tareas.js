const Tarea = require("./tarea");

class Tareas {

    //Las llaves son un OBJETO
    _listado = {}

    constructor(){
        this._listado = {};
    }

    get listadoArray () {

        const arr = [];
        Object.keys(this._listado).forEach(key =>{
            arr.push(this._listado[key])
        })
        return arr;

    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
        
    }

}

module.exports = Tareas;