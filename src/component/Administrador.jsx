import React, { useRef, useState } from 'react'
import Modal from '@material-ui/core/Modal'
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

export default function Administrador() {
    const refHoraVerificar = useRef(null);
    const [aulaReservada, setAulaReservada] = useState(false);
    const [aula, setAula] = useState("no da")
    const [modal, setModal] = useState(false)
    const historial = useHistory();
    const titulo = document.title;

    const abrirCerrarModal = () => {
        setModal(!modal);
    }

    const Perfil = () => {
        historial.push('/perfil')
    }

    const CerrarSesion = () => {
        document.title = "Reserva de Aulas"
        historial.push('/')
        console.log("Cerrar Sesion");
        toast.success("SESION CERRADA CON EXITO", { position: "top-center" })
    }

    return (
        <div>
            <div className='containerEncabezado'>
                <div className='row'>
                    <div className='col'>
                        <button onClick={Perfil} type="button" class="btn btn-info sm-1 offset-1 mt-3">Perfil</button>
                    </div>
                    <div className='col'>
                        <h3 className='offset-4 mt-3'>Reserva Aula</h3>
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
                            <div className='encabezado'>
                                <h4> ADMINISTRADOR : {titulo} </h4>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <button onClick={() => {
                                        setModal(!modal);
                                    }} type="button" class="btn btn-info ">🏫</button>
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
                                            <div className='col'>
                                                <div className='contenedorCerrar'>
                                                    <button onClick={abrirCerrarModal} type="button" class="btn btn-info ">❌</button>
                                                </div>
                                            </div>
                                            <div clasName='contenedorAula'>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='bordeAula2'>
                                                        <div className='segmento'>
                                                            <div className='row'>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("690A")
                                                                    }} type="button" class="btn btn-info ">690A</button>
                                                                    <Modal
                                                                        open={aulaReservada}>
                                                                        <div className='ModalEmergente'>
                                                                            <div className='containerEncabezadoModal'>
                                                                                <div className='row'>
                                                                                    <div className='col'>
                                                                                        <h3 className='mt-3'>Aulas</h3>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='contenedorCerrarEmergente'>
                                                                                <button onClick={() => {
                                                                                    setAulaReservada(!aulaReservada);

                                                                                }} type="button" class="btn btn-info ">❌</button>
                                                                            </div>
                                                                            <div>
                                                                                <h4 className='mt-4'> Hora</h4>
                                                                                <div className='containerHora'>
                                                                                    <input type="time"
                                                                                        required
                                                                                        ref={refHoraVerificar}
                                                                                        class="form-control"
                                                                                    />
                                                                                </div>
                                                                                <div className='botonVerificar'>
                                                                                    <button onClick={() => {
                                                                                        var existe = true
                                                                                        if (existe) {
                                                                                            toast.success(aula + ' AULA DISPONIBLE', { position: 'top-center' })
                                                                                        } else {
                                                                                            toast.error(aula + ' AULA NO DISPONIBLE', { position: 'top-center' })
                                                                                        }
                                                                                    }} type="button" class="btn btn-info ">VERIFICAR</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Modal>
                                                                </div>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("690B")
                                                                    }} type="button" class="btn btn-info ">690B</button>
                                                                </div>
                                                            </div>
                                                            <div className='row mt-4'>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("690C")
                                                                    }} type="button" class="btn btn-info ">690C</button>
                                                                </div>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("690D")
                                                                    }} type="button" class="btn btn-info ">690D</button>
                                                                </div>
                                                            </div>
                                                            <h3 className='plantabaja'>PLANTA BAJA</h3>
                                                        </div>
                                                    </div>
                                                    <div className='bordeAula'>
                                                        <div className='segmento'>
                                                            <div className='row'>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("691A")
                                                                    }} type="button" class="btn btn-info ">691A</button>
                                                                </div>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("691B")
                                                                    }} type="button" class="btn btn-info ">691B</button>
                                                                </div>
                                                            </div>
                                                            <div className='row mt-4'>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("691C")
                                                                    }} type="button" class="btn btn-info ">691C</button>
                                                                </div>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("691D")
                                                                    }} type="button" class="btn btn-info ">691D</button>
                                                                </div>
                                                            </div>
                                                            <div className='row mt-4'>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("691E")
                                                                    }} type="button" class="btn btn-info ">691E</button>
                                                                </div>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("691F")
                                                                    }} type="button" class="btn btn-info ">691F</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <h3 className='piso1'>PISO 1</h3>
                                                    </div>
                                                    <div className='bordeAula'>
                                                        <div className='segmento'>
                                                            <div className='row'>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("692A")
                                                                    }} type="button" class="btn btn-info ">692A</button>
                                                                </div>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("692B")
                                                                    }} type="button" class="btn btn-info ">692B</button>
                                                                </div>
                                                            </div>
                                                            <div className='row mt-4'>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("692C")
                                                                    }} type="button" class="btn btn-info ">692C</button>
                                                                </div>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("692D")
                                                                    }} type="button" class="btn btn-info ">692D</button>
                                                                </div>
                                                            </div>
                                                            <div className='row mt-4'>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("692E")
                                                                    }} type="button" class="btn btn-info ">692E</button>
                                                                </div>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("692F")
                                                                    }} type="button" class="btn btn-info ">692F</button>
                                                                </div>
                                                            </div>
                                                            <div className='row mt-4'>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("692G")
                                                                    }} type="button" class="btn btn-info ">692G</button>
                                                                </div>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("692H")
                                                                    }} type="button" class="btn btn-info ">692H</button>
                                                                </div>
                                                            </div>
                                                            <h3 className='piso2'>PISO 2</h3>
                                                        </div>
                                                    </div>
                                                    <div className='bordeAula1'>
                                                        <div className='segmento'>
                                                            <div className='row mt-4'>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("693A")
                                                                    }} type="button" class="btn btn-info ">693A</button>
                                                                </div>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("693B")
                                                                    }} type="button" class="btn btn-info ">693B</button>
                                                                </div>
                                                            </div>
                                                            <div className='row mt-4'>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("693C")
                                                                    }} type="button" class="btn btn-info ">693C</button>
                                                                </div>
                                                                <div className='col'>
                                                                    <button onClick={() => {
                                                                        setAulaReservada(!aulaReservada);
                                                                        setAula("693D")
                                                                    }} type="button" class="btn btn-info ">693D</button>
                                                                </div>
                                                            </div>
                                                            <div className='row mt-4'>
                                                                <div className='col-ms-4'>
                                                                    <div className='botonAudi'>
                                                                        <button onClick={() => {
                                                                            setAulaReservada(!aulaReservada);
                                                                            setAula("AUDITORIO")
                                                                        }} type="button" class="btn btn-info ">AUDITORIO</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <h3 className='piso3'>PISO 3</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Toaster
                                                    position="top-center"
                                                    reverseOrder={false}
                                                />
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
