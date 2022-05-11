import React, { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

export function Reserva() {
    const historial = useHistory();
    const titulo = document.title;
    const [NroAula, setNroAula] = useState('');
    const refCarrera = useRef(null);
    const refMateria = useRef(null);
    const refGrupo = useRef(null);
    const refCantidadEstudiantes = useRef(null);
    const refAula = useRef(null);
    const refMotivo = useRef(null);
    const refFecha = useRef(null);
    const refHora = useRef(null);
    const refPeriodo = useRef(null);

    const mayuscula = (event) => {
        event.preventDefault();
        setNroAula(event.target.value.toUpperCase());

    }
    const CerrarSesion = () => {
        document.title = "Reserva de Aulas"
        historial.push('/')
        console.log("Cerrar Sesion");
        toast.success("SESION CERRADA CON EXITO", { position: "top-center" })
    }

    const EnviarSolicitud = () => {
        var carrera = refCarrera.current.value;
        var materia = refMateria.current.value;
        var grupo = refGrupo.current.value;
        var cantidadEstudiantes = refCantidadEstudiantes.current.value;
        /*var aula = refAula.current.value;
        var motivo = refMotivo.current.value;
        var fecha = refFecha.current.value;
        var hora = refHora.current.value;
        var periodo = refPeriodo.current.value;
        //console.log(carrera, materia, grupo, cantidadEstudiantes, aula, motivo, fecha, hora, periodo)
        /**/
        if (carrera != "Seleccionar Carrera") {
            if (materia != "Seleccionar Materia") {
                if (grupo != "") {
                    if (grupo > 0 && grupo < 6) {
                        if ( cantidadEstudiantes!= "") {
                            if (cantidadEstudiantes > 0 && cantidadEstudiantes < 301) {
                                console.log("Solicitud enviada");
                                toast.success("SOLICITUD ENVIADA", { position: "top-center" })
                            } else {
                                console.log("Cantidad Estudiantes Fuera Del Rango");
                                toast.error("CANTIDAD ESTUDIANTES FUERA DEL RANGO", { position: "top-center" })
                            }
                        } else {
                            console.log("Introducir Cantidad");
                            toast.error("SELECCIONAR CANTIDAD DE ESTUDIANTES", { position: "top-center" })
                        }
                    } else {
                        console.log("Seleccionar Grupo Del Rango");
                        toast.error("GRUPO INVALIDO", { position: "top-center" })
                    }
                } else {
                    console.log("Seleccionar Grupo");
                    toast.error("SELECCIONAR GRUPO", { position: "top-center" })
                }
            } else {
                console.log("Seleccionar Materia");
                toast.error("SELECCIONAR MATERIA", { position: "top-center" })
            }
        } else {
            console.log("Seleccionar Carrera");
            toast.error("SELECCIONAR CARRERA", { position: "top-center" })
        }
    }
    return (
        <div>
            <div className='containerEncabezado'>
                <div className='row'>
                    <div className='col'>
                        <button type="button" class="btn btn-info sm-1 offset-1 mt-3">Perfil</button>
                    </div>
                    <div className='col'>
                        <h3 className='-sm-6 offset-4 mt-3'>Reserva Aula</h3>
                    </div>
                    <div className='col'>
                        <button onClick={CerrarSesion} type="button" class="btn btn-info offset-7 mt-3">Cerrar Sesion</button>

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 offset-3 mt-3">
                    <div className="card pt-10">
                        <div className="card-body">
                            <h4> Docente : {titulo}</h4>
                            <div className='row'>
                                <div className='col-sm-3 mt-3'>
                                    <h4> Carrera :</h4>
                                </div>
                                <div className='col-sm-8 mt-3'>
                                    <select class="form-select" ref={refCarrera} required>
                                        <option selected>Ingenieria Sistemas</option>
                                        <option selected>Ingenieria Civil</option>
                                        <option selected>Ingenieria Industrial</option>
                                        <option selected>Seleccionar Carrera</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-3 mt-3'>
                                    <h4> Materia :</h4>
                                </div>
                                <div className='col-sm-8 mt-3'>
                                    <select class="form-select" ref={refMateria} required>
                                        <option selected>Taller de ingenieria de software</option>
                                        <option selected>Introduccion a la programacion</option>
                                        <option selected>Ingenieria de software</option>
                                        <option selected>Seleccionar Materia</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-3 mt-3'>
                                    <h4> Grupo :</h4>
                                </div>
                                <div className='col-sm-2 mt-3'>
                                    <input
                                        required
                                        ref={refGrupo}
                                        className='form-control'
                                        placeholder=''
                                        type="number"
                                        min={0}
                                        max={5}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6 mt-3'>
                                    <h4> Cantidad Estudiantes :</h4>
                                </div>
                                <div className='col mt-3'>
                                    <input
                                        required
                                        ref={refCantidadEstudiantes}
                                        type="number"
                                        class="form-control"
                                        min={1}
                                        max={300}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-2 mt-3'>
                                    <h4> Aula :</h4>
                                </div>
                                <div className='col-sm-2 mt-3'>
                                    <input
                                        required
                                        ref={refAula}
                                        value={NroAula}
                                        type="text"
                                        class="form-control"
                                        onChange={mayuscula}
                                    />
                                </div>
                                <div className='col mt-3'>
                                    <button type="button" class="btn btn-info ">🏫</button>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-3 mt-3'>
                                    <h4> Motivo :</h4>
                                </div>
                                <div className='col-sm-5 mt-3'>
                                    <select class="form-select" ref={refMotivo} required>
                                        <option selected>Examen</option>
                                        <option selected>Laboratorio</option>
                                        <option selected>Practica</option>
                                        <option selected>Revision</option>
                                        <option selected>Seleccionar Motivo</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-4 mt-3'>
                                    <h4> Fecha :</h4>
                                    <input type="date"
                                        required
                                        class="form-control"
                                        ref={refFecha}
                                    />
                                </div>
                                <div className='col-sm-4 mt-3'>
                                    <h4> Hora :</h4>
                                    <input type="time"
                                        required
                                        ref={refHora}
                                        class="form-control"
                                    />
                                </div>
                                <div className='col-sm-4 mt-3'>
                                    <h4> Periodo :</h4>
                                    <select class="form-select" ref={refPeriodo} required>
                                        <option value={1}>1 Periodo</option>
                                        <option value={2}>2 Periodo</option>
                                    </select>
                                </div>
                            </div>
                            <div class="d-grid gap-2 mt-3">
                                <button onClick={EnviarSolicitud} type="button" class="btn btn-info">Enviar Solicitud</button>
                            </div>

                        </div>
                    </div>
                </div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </div >
        </div >
    )
}
