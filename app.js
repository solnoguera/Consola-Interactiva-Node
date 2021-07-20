//Primero importaciones de terceros
const colors = require('colors');
const { guardarDB } = require('./helpers/archivo');
//Luego las nuestras
const { menu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require("./models/tareas");



const main = async() => {

    const tareas = new Tareas();

    do{
        opt = await menu();
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción de la tarea:');
                tareas.crearTarea(desc);
                await pausa();
            break;
            case '2' : 
                console.log(tareas.listadoArray);
                await pausa();
            break;


        }

        //guardarDB(tareas.listadoArray);


    } while(opt !== '0')
}

main();