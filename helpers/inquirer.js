require('colors');

const inquirer = require('inquirer')

const preguntas = [

    {
        type : 'list',
        name : 'Opcion',
        value : '¿Qué deseas hacer?',
        choices : [

            {
                value: '1', 
                name: `${'1.'.green} Crear tarea.`
            },
            {
                value: '2', 
                name: `${'2.'.green} Listar tareas.`
            },
            {
                value: '3', 
                name: `${'3.'.green} Listar tareas completadas.`
            },
            {
                value: '4', 
                name: `${'4.'.green} Listar tareas pendientes.`
            },
            {
                value: '5', 
                name: `${'5.'.green} Completar tarea(s).`
            },
            {
                value: '6', 
                name: `${'6.'.green} Borrar tarea.`
            },
            {
                value: '0', 
                name: `${'0.'.green} Salir.`
            }
        ]
    },

]

//Devuelve una promesa
const menu = async() => {
    console.clear();
    console.log("============================\n".green);
    console.log("============================\n".green);
    console.log("   Seleccione una opción\n".white);
    console.log("============================\n".green);
    console.log("============================\n".green);
    //Esperamos la promesa que devuelve el inquire

    //IMPORTANTE el nombre es depende del nombre que le pusimos en el objeto preguntas
    const {Opcion}  =  await inquirer.prompt(preguntas);

    return Opcion;
}

//Devuelve una promesa
const pausa = async() => {

    const pregunta = [
        {
            type : 'input',
            name : 'enter', //Esto en realidad no nos sirve de nada
            message : `Presione ${'ENTER'.green} para continuar.`
        }
    ]
    console.log('\n');
    //Esperamos la promesa que devuelve el inquire
    //El await va a esperar a que se presione ENTER para continuar
    await inquirer.prompt(pregunta);

}

const confirmacion = async( message ) => {
    const pregunta = [

        {
            type : 'confirm',
            name : 'ok',
            message
        }

    ]

    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

const leerInput = async(message = '') => {

    const pregunta = [
        {
            type : 'input',
            name : 'preg', //Esto en realidad no nos sirve de nada
            message,
            validate( value ) {
                if (value.length === 0){
                    return 'Por favor, ingrese un valor.'
                }
                return true;
            }
        }
    ];
    //desestructuramos para que devuelva solo el dato, no un objeto
    const { preg } = await inquirer.prompt(pregunta);
    return preg;

}


/**
{
    value: tarea.id, 
    name: `${'1.'.green} descripcion.`
},

*/

const listadoTareaParaBorrar = async(tareas = []) => {
    //El metodo map recorre los elementos del array y crea otro array hijo
    const choices = tareas.map( (tarea, index) => {

        const idx = `${index + 1}.`.green;
        return {
            value : tarea.id,
            name : `${idx} ${tarea.descripcion}`
        }

    } );
    //Agrega al principio del array
    choices.unshift({
        value : '0',
        name : '0.'.green + 'Cancelar.'
    });

    const preguntas = [

        {
            type : 'list',
            name : 'id',
            message : 'Borrar:',
            choices 
        }
    ]
    
    const {id}  =  await inquirer.prompt(preguntas);

    return id;
}


const listadoCheckList = async(tareas = []) => {
    //El metodo map recorre los elementos del array y crea otro array hijo
    const choices = tareas.map( (tarea, index) => {

        const idx = `${index + 1}.`.green;
        return {
            //Value es lo que nos regresa
            value : tarea.id,
            name : `${idx} ${tarea.descripcion}`,
            checked : tarea.completado
        }

    } );


    const pregunta = [

        {
            type : 'checkbox',
            name : 'ids',
            message : 'Seleccione',
            choices 
        }
    ]
    
    const {ids}  =  await inquirer.prompt(pregunta);

    return ids;
}





module.exports = {
    menu,
    pausa,
    leerInput,
    listadoTareaParaBorrar,
    confirmacion,
    listadoCheckList
}



