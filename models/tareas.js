const Tarea = require("./tarea");
require('colors');

class Tareas {

    //Las llaves son un OBJETO
    _listado = {}

    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ''){

        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    get listadoComoArray () {

        const arr = [];
        Object.keys(this._listado).forEach(key =>{
            arr.push(this._listado[key])
        })
        return arr;

    }

    crearListado(tareas = []) {

        for (let index = 0; index < tareas.length; index++) {
            const tarea = tareas[index];
            this._listado[tarea.id] = tarea;
        }
        //console.log(this._listado);
    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
        
    }

    listadoCompleto(){
        const status = "";
        console.log();
        this.listadoComoArray.forEach( (tarea, index) => {
            const idx = `${index + 1}`.green;
            const { completado, descripcion } = tarea;
            const status = (completado)
                            ? "Completada".green
                            : "Pendiente".red;
            
            console.log(`${idx}. ${descripcion}  :: ${status}`);
        });
        
    }

    listarCompletadasOPendientes(completadas = true ) {

        let idx1 = 1; 
        let idx2 = 1;
        let idx = 0;

        console.log();
        this.listadoComoArray.forEach( (tarea) => {
            
            const { completado, descripcion, date } = tarea;
            
            if(completadas && completado){
                
                idx = `${idx1}`.green;
                console.log(`${idx}. ${descripcion}  :: ${'Completada'.green} el día: ${date.green}.`);
                idx1++;

            } else if(!completadas && !completado){
                idx = `${idx2}`.green;
                console.log(`${idx}. ${descripcion}  :: ${'Pendiente'.red}`);
                idx2++;
            }
            
        });
    }

    toggleTareasCompletadas(ids = []) {

        ids.forEach( id => {
            
            const tarea = this._listado[id];
            if(!tarea.completado){
                tarea.completado = true;
                tarea.date = this._fecha();
            }
    
        } );

        //Tambien tenemos que borrar las que no estan seleccionadas
        this.listadoComoArray.forEach(tarea=> {
            //Si el array de ids no incluye el ID entonces modificamos el objeto tarea en el que estamos parados
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completado = false;
                this._listado[tarea.id].date = "";
            }
        });
    
    }

    _fecha(){
        const fecha = new Date();
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1; 
        const anio = fecha.getFullYear();
        return `${dia}-${mes}-${anio}`;
    }



}

module.exports = Tareas;