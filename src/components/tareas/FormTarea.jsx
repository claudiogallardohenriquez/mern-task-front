import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
    //Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //Obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const {
        tareaseleccionada,
        errortarea,
        agregarTarea,
        validarTarea,
        obtenerTareas,
        actualizarTarea,
        limpiarTarea,
    } = tareasContext;

    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if (tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({ nombre: '' });
        }
    }, [tareaseleccionada]); //detecta o revisa la tarea seleccionada

    //State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: '',
    });

    //Extraer el nombre del proyecto
    const { nombre } = tarea;

    //Si no hay proyecto seleccionado
    if (!proyecto) return null;

    //array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //Leer los valores del formulario
    const handleChange = (e) => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        //validar
        if (nombre.trim() === '') {
            validarTarea();
            return; //Para no ejecutar la siguiente linea
        }

        //Revisar si es edición o si es nueva tarea
        if (tareaseleccionada === null) {
            //agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            //Actualizar tarea existente
            actualizarTarea(tarea);
            //Elimina tarea seleccionada del state
            limpiarTarea();
        }

        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        //reiniciar el form
        guardarTarea({
            nombre: '',
        });
    };

    return (
        <div className="formulario">
            <form onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea..."
                        name="nombre"
                        onChange={handleChange}
                        value={nombre}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={
                            tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'
                        }
                    />
                </div>
            </form>
            {errortarea ? (
                <p className="mensaje error">
                    El nombre de la tarea es obligatorio
                </p>
            ) : null}
        </div>
    );
};

export default FormTarea;
