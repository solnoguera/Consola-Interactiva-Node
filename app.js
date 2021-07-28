//Primero importaciones de terceros
const colors = require('colors');
//Luego las nuestras
const { guardarDB, leerDB } = require('./helpers/archivo');
const { menu, pausa, leerInput, listadoTareaParaBorrar, confirmacion, listadoCheckList } = require('./helpers/inquirer');
const Tareas = require("./models/tareas");



const main = async() => {

    console.clear();
    const tareas = new Tareas();
    const tareasDB = leerDB();
    
    if(tareasDB){
        //Establecer tareas en la clase Tareas
        tareas.crearListado(tareasDB);
    }

    do{
        console.clear();
         
        opt = await menu();
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción de la tarea:');
                tareas.crearTarea(desc);
                await pausa();
            break;
            case '2' : 
                tareas.listadoCompleto();
                await pausa();
            break;
            case '3':
                tareas.listarCompletadasOPendientes(true);
                await pausa();
            break;
            case '4':
                tareas.listarCompletadasOPendientes(false);
                await pausa();
            break;
            case '5':
                const ids = await listadoCheckList(tareas.listadoComoArray);
                tareas.toggleTareasCompletadas(ids);
                await pausa();
            break;
            case '6':
                const id = await listadoTareaParaBorrar(tareas.listadoComoArray);
                if(id != '0'){

                    const ok = await confirmacion('¿Está seguro que desea borrar esta tarea?');
                    if(ok) {
                        tareas.borrarTarea(id);
                        console.log('\nTarea borrada correctamente.');
                    }

                }
                await pausa();
            break;

        }

        guardarDB(tareas.listadoComoArray);


    } while(opt !== '0')
}

main();