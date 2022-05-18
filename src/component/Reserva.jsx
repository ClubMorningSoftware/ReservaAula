import React, { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal'

export function Reserva() {
    const historial = useHistory();
    const titulo = document.title;
    const [NroAula, setNroAula] = useState('');
    const [modal, setModal] = useState(false)
    const refCarrera = useRef(null);
    const refMateria = useRef(null);
    const refGrupo = useRef(null);
    const refCantidadEstudiantes = useRef(null);
    const refAula = useRef(null);
    const refMotivo = useRef(null);
    const refFecha = useRef(null);
    const refHora = useRef(null);
    const refPeriodo = useRef(null);

    const abrirCerrarModal = () => {
        setModal(!modal);
    }

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

    const Perfil = () => {
        historial.push('/perfil')
    }

    const exiteAula = (aula) => {
        return true;
    }


    const EnviarSolicitud = () => {
        var carrera = refCarrera.current.value;
        var materia = refMateria.current.value;
        var grupo = refGrupo.current.value;
        var cantidadEstudiantes = refCantidadEstudiantes.current.value;
        var aula = refAula.current.value;
        var motivo = refMotivo.current.value;
        var fecha = refFecha.current.value;
        var hora = refHora.current.value;
        var periodo = refPeriodo.current.value;
        if (carrera != "Seleccionar Carrera") {
            if (materia != "Seleccionar Materia") {
                if (grupo != "") {
                    if (grupo > 0 && grupo < 6) {
                        if (cantidadEstudiantes != "") {
                            if (cantidadEstudiantes > 0 && cantidadEstudiantes < 301) {
                                if (aula != "") {
                                    if (exiteAula(aula)) {
                                        if (motivo != "Seleccionar Motivo") {
                                            if (fecha != "") {
                                                const fechaActual = new Date().toISOString();
                                                if (fecha > fechaActual) {
                                                    if (hora != "") {
                                                        if (hora.substring(0, 2) > 7 && hora.substring(0, 2) < 21) {
                                                            if (periodo != "Seleccionar Periodo") {
                                                                console.log("Solicitud enviada");
                                                                toast.success("SOLICITUD ENVIADA", { position: "top-center" })
                                                            } else {
                                                                console.log("Seleccionar Periodo");
                                                                toast.error("SELECCIONAR PERIODO", { position: "top-center" })
                                                            }
                                                        } else {
                                                            console.log("Hora no valida");
                                                            toast.error("HORA INVALIDA", { position: "top-center" })
                                                        }
                                                    } else {
                                                        console.log("Introducir Hora");
                                                        toast.error("INTRODUCIR HORA", { position: "top-center" })
                                                    }
                                                } else {
                                                    console.log("Fecha no valida");
                                                    toast.error("FECHA INVALIDA", { position: "top-center" })
                                                }
                                            } else {
                                                console.log("Introducir Fecha");
                                                toast.error("INTRODUCIR FECHA", { position: "top-center" })
                                            }
                                        } else {
                                            console.log("No hay motivo");
                                            toast.error("SELECCIONAR MOTIVO", { position: "top-center" })
                                        }
                                    } else {
                                        console.log("Aula no existe");
                                        toast.error("AULA INVALIDA", { position: "top-center" })
                                    }
                                } else {
                                    console.log("Introducir Aula");
                                    toast.error("INTRODUCIR AULA", { position: "top-center" })
                                }

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
                        <button onClick={Perfil} type="button" class="btn btn-info sm-1 offset-1 mt-3">Perfil</button>
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
                                    <button onClick={abrirCerrarModal} type="button" class="btn btn-info ">🏫</button>
                                    <Modal
                                        open={modal}>
                                        <div className='contenedorModal'>
                                            <div className='containerEncabezadoModal'>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <h3 className='mt-3'>Aulas</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='contenedorCerrar'>
                                                <button onClick={abrirCerrarModal} type="button" class="btn btn-info ">❌</button>
                                            </div>
                                        </div>
                                    </Modal>
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
                                        <option selected>1 Periodo</option>
                                        <option selected>2 Periodo</option>
                                        <option selected>Seleccionar Periodo</option>
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
