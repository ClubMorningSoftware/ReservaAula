import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

export function Reserva() {
    const historial = useHistory();
    const titulo = document.title;

    const CerrarSesion = () => {
        document.title = "Reserva de Aulas"
        historial.push('/')
        console.log("Cerrar Sesion");
        toast.error("SESION CERRADA CON EXITO", { position: "top-center" })
    }
    return (
        <div>
            <div className="row">
                <div className="col-sm-6 offset-3 mt-5">
                    <div className="card pt-10">
                        <div className="card-header">
                            <div className='encabezado'>
                                <h3>Reserva Aula</h3>
                            </div>
                        </div>
                        <div className="card-body">
                            <h4> Docente : {titulo}</h4>
                            <div className='row mt-2'>
                                <div className='col-sm-3'>
                                    <h4> Carrera :</h4>
                                </div>
                                <div className='col-sm-8'>
                                    <select class="form-select">
                                        <option selected>Seleccionar Carrera</option>
                                        <option value="1">Ingenieria Sistemas</option>
                                        <option value="2">Ingenieria Civil</option>
                                        <option value="3">Ingenieria Industrial</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row mt-2'>
                                <div className='col-sm-3'>
                                    <h4> Materia :</h4>
                                </div>
                                <div className='col-sm-8'>
                                    <select class="form-select">
                                        <option selected>Seleccionar Materia</option>
                                        <option value="1">Taller de ingenieria de software</option>
                                        <option value="2">Introduccion a la programacion</option>
                                        <option value="3">Ingenieria de software</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row mt-2 '>
                                <div className='col-sm-3'>
                                    <h4> Grupo :</h4>
                                </div>
                                <div className='col-sm-2'>
                                    <input
                                        className='form-control'
                                        placeholder=''
                                        type="number"
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row mt-2 '>
                                <div className='col-sm-6'>
                                    <h4> Cantidad Estudiantes :</h4>
                                </div>
                                <div className='col-sm-3'>
                                    <input
                                        type="number"
                                        class="form-control"
                                    />
                                </div>
                            </div>
                            <div className='row mt-2 '>
                                <div className='col-sm-2'>
                                    <h4> Aula :</h4>
                                </div>
                                <div className='col-sm-2'>
                                    <input
                                        type="text"
                                        class="form-control"
                                    />
                                </div>
                            </div>
                            <div className='row mt-2'>
                                <div className='col-sm-3'>
                                    <h4> Motivo :</h4>
                                </div>
                                <div className='col-sm-5'>
                                    <select class="form-select">
                                        <option selected>Seleccionar Motivo</option>
                                        <option value="1">Examen</option>
                                        <option value="2">Laboratorio</option>
                                        <option value="3">Practica</option>
                                        <option value="3">Revision</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row mt-2'>
                                <div className='col-sm-4'>
                                    <h4> Fecha :</h4>
                                    <input type="date"
                                        class="form-control"
                                    />
                                </div>
                                <div className='col-sm-4'>
                                    <h4> Hora :</h4>
                                    <input type="time"
                                        class="form-control"
                                    />
                                </div>
                                <div className='col-sm-4'>
                                    <h4> Periodo :</h4>
                                    <input
                                        type="number"
                                        class="form-control"
                                    />
                                </div>
                            </div>
                            <div class="d-grid gap-2 mt-3">
                                <button type="button" class="btn btn-info">Enviar Solicitud</button>
                            </div>
                            <div class="d-grid gap-2 mt-3">
                                <button onClick={CerrarSesion} type="button" class="btn btn-info">Cerrar Sesion</button>
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
