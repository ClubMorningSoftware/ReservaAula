import React, { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import { Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'
import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function Administrador() {

    const [modal, setModal] = useState(false)
    const historial = useHistory();
    const titulo = document.title;
    const [Actualizo, setActualizo] = useState(false);

    window.onbeforeunload = function (e) {
        return "You have some unsaved changes"
    };



    if (titulo == "Reserva Aulas") {
        historial.push('/')
    }

    const [datosReserva, setDatosReserva] = useState([{
        codReserva: '',
        nombreDocente: '',
        carrera: '',
        materia: '',
        grupo: '',
        cantidad: '',
        motivo: '',
        fecha: '',
        hora: '',
        periodo: '',
        aula: ''

    }]);

    const abrirCerrarModal = () => {
        setModal(!modal);
    }

    const CerrarSesion = () => {
        document.title = "Reserva de Aulas"
        historial.push('/')
        console.log("Cerrar Sesion");
        toast.success("SESION CERRADA CON EXITO", { position: "top-center" })
    }

    const Actualizar = () => {
        axios.get('https://sistema-reserva-aula.herokuapp.com/todasReservas').then(response => {
            setDatosReserva(response.data)
            setActualizo(true)
        })
    }

    const peticionGet = async () => {
        axios.get('https://sistema-reserva-aula.herokuapp.com/todasReservas').then(response => {
            setDatosReserva(response.data)
            setActualizo(true)
        })
    }

    useEffect(() => {
        peticionGet();
    }, [])

    const [reservaSeleccionada, setReservaSeleccionada] = useState([])

    const obtenerAulas = (fecha, hora, aula, periodo) => {
        if (periodo == "1 Periodo") {
            axios.get('https://sistema-reserva-aula.herokuapp.com/obtenerAulasFechaHora/' + fecha + "_" + aula + "_" + hora).then(response => {
                var listaAulas = response.data
                if (listaAulas.length == 0) {
                    toast.success(aula + ' AULA DISPONIBLE', { position: 'top-center' })
                    axios.put('https://sistema-reserva-aula.herokuapp.com/actualizarReserva/' + reservaSeleccionada.CODRESERVA, {
                        "DOCENTE": reservaSeleccionada.DOCENTE,
                        "CARRERA": reservaSeleccionada.CARRERA,
                        "MATERIA": reservaSeleccionada.MATERIA,
                        "GRUPO": reservaSeleccionada.GRUPO,
                        "CANTIDADESTUDIANTES": reservaSeleccionada.CANTIDADESTUDIANTES,
                        "MOTIVO": reservaSeleccionada.MOTIVO,
                        "FECHA": reservaSeleccionada.FECHA,
                        "HORA": reservaSeleccionada.HORA,
                        "PERIODO": reservaSeleccionada.PERIODO,
                        "AULA": aula,
                        "CONFIRMADO": "false",
                        "RECHAZADO": "false"
                    }).then(response => {
                        Actualizar()
                        abrirCerrarModal()
                    })

                } else {
                    toast.error(aula + ' AULA NO DISPONIBLE', { position: 'top-center' })
                    console.log("no esta dispo")
                }
            })
        } else {
            if (periodo == "2 Periodo") {
                axios.get('https://sistema-reserva-aula.herokuapp.com/obtenerAulasFechaHora/' + fecha + "_" + aula + "_" + hora).then(response => {
                    var listaAulas = response.data
                    if (listaAulas.length == 0) {
                        var hora1 = parseInt(hora.substring(0, 2)) + 1;
                        var minuto1 = parseInt(hora.substring(3, 5));
                        if (minuto1 + 30 > 60) {
                            hora1 = hora1 + 1;
                            minuto1 = minuto1 + 30 - 60;
                        } else {
                            minuto1 = minuto1 + 30;
                        }
                        if (hora1 < 10) {
                            hora1 = "0" + hora1
                        }
                        axios.get('https://sistema-reserva-aula.herokuapp.com/obtenerAulasFechaHora/' + fecha + "_" + aula + "_" + hora1 + ":" + minuto1).then(response => {
                            var listaAulas1 = response.data
                            if (listaAulas1.length == 0) {
                                toast.success(aula + ' AULA DISPONIBLE', { position: 'top-center' })
                                axios.put('https://sistema-reserva-aula.herokuapp.com/actualizarReserva/' + reservaSeleccionada.CODRESERVA, {
                                    "DOCENTE": reservaSeleccionada.DOCENTE,
                                    "CARRERA": reservaSeleccionada.CARRERA,
                                    "MATERIA": reservaSeleccionada.MATERIA,
                                    "GRUPO": reservaSeleccionada.GRUPO,
                                    "CANTIDADESTUDIANTES": reservaSeleccionada.CANTIDADESTUDIANTES,
                                    "MOTIVO": reservaSeleccionada.MOTIVO,
                                    "FECHA": reservaSeleccionada.FECHA,
                                    "HORA": reservaSeleccionada.HORA,
                                    "PERIODO": reservaSeleccionada.PERIODO,
                                    "AULA": aula,
                                    "CONFIRMADO": "false",
                                    "RECHAZADO": "false"
                                }).then(response => {
                                    Actualizar()
                                    abrirCerrarModal()
                                })
                            } else {
                                toast.error(aula + ' AULA NO DISPONIBLE', { position: 'top-center' })
                                console.log("no esta dispo")
                            }
                        })


                    } else {
                        toast.error(aula + ' AULA NO DISPONIBLE', { position: 'top-center' })
                        console.log("no esta dispo")
                    }
                })
            } else {
                axios.get('https://sistema-reserva-aula.herokuapp.com/obtenerAulasFechaHora/' + fecha + "_" + aula + "_" + hora).then(response => {
                    var listaAulas = response.data
                    if (listaAulas.length == 0) {
                        var hora1 = parseInt(hora.substring(0, 2)) + 1;
                        var minuto1 = parseInt(hora.substring(3, 5));
                        if (minuto1 + 30 > 60) {
                            hora1 = hora1 + 1;
                            minuto1 = minuto1 + 30 - 60;
                        } else {
                            minuto1 = minuto1 + 30;
                        }
                        if (hora1 < 10) {
                            hora1 = "0" + hora1
                        }
                        axios.get('https://sistema-reserva-aula.herokuapp.com/obtenerAulasFechaHora/' + fecha + "_" + aula + "_" + hora1 + ":" + minuto1).then(response => {
                            var listaAulas1 = response.data
                            if (listaAulas1.length == 0) {
                                hora1 = hora1 + 1;
                                if (minuto1 + 30 > 60) {
                                    hora1 = hora1 + 1;
                                    minuto1 = minuto1 + 30 - 60;
                                } else {
                                    minuto1 = minuto1 + 30;
                                }
                                if (hora1 < 10) {
                                    hora1 = "0" + hora1
                                }
                                axios.get('https://sistema-reserva-aula.herokuapp.com/obtenerAulasFechaHora/' + fecha + "_" + aula + "_" + hora1 + ":" + minuto1).then(response => {
                                    var listaAulas2 = response.data
                                    if (listaAulas2.length == 0) {
                                        toast.success(aula + ' AULA DISPONIBLE', { position: 'top-center' })
                                        axios.put('http://cms.tis.cs.umss.edu.bo/actualizarReserva/' + reservaSeleccionada.CODRESERVA, {
                                            "DOCENTE": reservaSeleccionada.DOCENTE,
                                            "CARRERA": reservaSeleccionada.CARRERA,
                                            "MATERIA": reservaSeleccionada.MATERIA,
                                            "GRUPO": reservaSeleccionada.GRUPO,
                                            "CANTIDADESTUDIANTES": reservaSeleccionada.CANTIDADESTUDIANTES,
                                            "MOTIVO": reservaSeleccionada.MOTIVO,
                                            "FECHA": reservaSeleccionada.FECHA,
                                            "HORA": reservaSeleccionada.HORA,
                                            "PERIODO": reservaSeleccionada.PERIODO,
                                            "AULA": aula,
                                            "CONFIRMADO": "false",
                                            "RECHAZADO": "false"
                                        }).then(response => {
                                            Actualizar()
                                            abrirCerrarModal()
                                        })
                                    } else {
                                        toast.error(aula + ' AULA NO DISPONIBLE', { position: 'top-center' })
                                        console.log("no esta dispo")
                                    }
                                })
                            } else {
                                toast.error(aula + ' AULA NO DISPONIBLE', { position: 'top-center' })
                                console.log("no esta dispo")
                            }
                        })
                    } else {
                        toast.error(aula + ' AULA NO DISPONIBLE', { position: 'top-center' })
                        console.log("no esta dispo")
                    }
                })
            }
        }
    }

    return (
        <div>
            <div className='containerEncabezado'>
                <div className='row'>
                    <div className='col'>

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
                <div className="col mt-2">
                    <div className="card  ">
                        <div className="card-body">
                            <div className='encabezado'>
                                <h4> ADMINISTRADOR : {titulo} </h4>
                            </div>
                            <div >
                                <div>
                                    <div className='row'>
                                        <div className='col'>
                                            <button onClick={Actualizar} type="button" class="btn btn-info ">ACTUALIZAR 🔄</button>
                                        </div>
                                    </div>
                                    <div>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>CODIGO RESERVA</TableCell>
                                                    <TableCell>NOMBRE DEL DOCENTE</TableCell>
                                                    <TableCell>CARRERA</TableCell>
                                                    <TableCell>MATERIA</TableCell>
                                                    <TableCell>GRUPO</TableCell>
                                                    <TableCell>CANTIDAD DE ESTUDIANTES</TableCell>
                                                    <TableCell>MOTIVO</TableCell>
                                                    <TableCell>FECHA</TableCell>
                                                    <TableCell>HORA</TableCell>
                                                    <TableCell>PERIODO</TableCell>
                                                    <TableCell>ASIGNAR</TableCell>
                                                    <TableCell>AULA</TableCell>
                                                    <TableCell>CONFIRMAR</TableCell>
                                                    <TableCell>RECHAZAR</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    datosReserva.map(datos => {

                                                        if (Actualizo) {
                                                            return (
                                                                <TableRow key={datos.CODRESERVA}>
                                                                    <TableCell>{datos.CODRESERVA}</TableCell>
                                                                    <TableCell>{datos.DOCENTE}</TableCell>
                                                                    <TableCell>{datos.CARRERA}</TableCell>
                                                                    <TableCell>{datos.MATERIA}</TableCell>
                                                                    <TableCell>{datos.GRUPO}</TableCell>
                                                                    <TableCell>{datos.CANTIDADESTUDIANTES}</TableCell>
                                                                    <TableCell>{datos.MOTIVO}</TableCell>
                                                                    <TableCell>{datos.FECHA}</TableCell>
                                                                    <TableCell>{datos.HORA}</TableCell>
                                                                    <TableCell>{datos.PERIODO}</TableCell>
                                                                    <TableCell><button onClick={() => {
                                                                        setModal(!modal);
                                                                        setReservaSeleccionada(datos)
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
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "690A", periodo)
                                                                                                        }} type="button" class="btn btn-info ">690A</button>

                                                                                                    </div>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "690B", periodo)
                                                                                                        }} type="button" class="btn btn-info ">690B</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className='row mt-4'>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "690C", periodo)
                                                                                                        }} type="button" class="btn btn-info ">690C</button>
                                                                                                    </div>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "690D", periodo)
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
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "691A", periodo)
                                                                                                        }} type="button" class="btn btn-info ">691A</button>
                                                                                                    </div>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "691B", periodo)
                                                                                                        }} type="button" class="btn btn-info ">691B</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className='row mt-4'>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "691C", periodo)
                                                                                                        }} type="button" class="btn btn-info ">691C</button>
                                                                                                    </div>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "691D", periodo)
                                                                                                        }} type="button" class="btn btn-info ">691D</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className='row mt-4'>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "691E", periodo)
                                                                                                        }} type="button" class="btn btn-info ">691E</button>
                                                                                                    </div>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "691F", periodo)
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
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "692A", periodo)
                                                                                                        }} type="button" class="btn btn-info ">692A</button>
                                                                                                    </div>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "692B", periodo)
                                                                                                        }} type="button" class="btn btn-info ">692B</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className='row mt-4'>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "692C", periodo)
                                                                                                        }} type="button" class="btn btn-info ">692C</button>
                                                                                                    </div>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "692D", periodo)
                                                                                                        }} type="button" class="btn btn-info ">692D</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className='row mt-4'>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "692E", periodo)
                                                                                                        }} type="button" class="btn btn-info ">692E</button>
                                                                                                    </div>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "692F", periodo)
                                                                                                        }} type="button" class="btn btn-info ">692F</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className='row mt-4'>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "692G", periodo)
                                                                                                        }} type="button" class="btn btn-info ">692G</button>
                                                                                                    </div>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "692H", periodo)
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
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "693A", periodo)
                                                                                                        }} type="button" class="btn btn-info ">693A</button>
                                                                                                    </div>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "693B", periodo)
                                                                                                        }} type="button" class="btn btn-info ">693B</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className='row mt-4'>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "693C", periodo)
                                                                                                        }} type="button" class="btn btn-info ">693C</button>
                                                                                                    </div>
                                                                                                    <div className='col'>
                                                                                                        <button onClick={() => {
                                                                                                            var fecha = reservaSeleccionada.FECHA
                                                                                                            var hora = reservaSeleccionada.HORA
                                                                                                            var periodo = reservaSeleccionada.PERIODO
                                                                                                            obtenerAulas(fecha, hora, "693D", periodo)
                                                                                                        }} type="button" class="btn btn-info ">693D</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className='row mt-4'>
                                                                                                    <div className='col-ms-4'>
                                                                                                        <div className='botonAudi'>
                                                                                                            <button onClick={() => {
                                                                                                                var fecha = reservaSeleccionada.FECHA
                                                                                                                var hora = reservaSeleccionada.HORA
                                                                                                                var periodo = reservaSeleccionada.PERIODO
                                                                                                                obtenerAulas(fecha, hora, "AUDITORIO", periodo)
                                                                                                            }} type="button" class="btn btn-info ">AUDITORIO</button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <h3 className='piso3'>PISO 3</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Modal>
                                                                    </TableCell>
                                                                    <TableCell >{datos.AULA}</TableCell>
                                                                    <TableCell><button onClick={() => {
                                                                        if (datos.AULA != null) {
                                                                            axios.post('http://cms.tis.cs.umss.edu.bo/añadirHistorial', {
                                                                                "DOCENTE": datos.DOCENTE,
                                                                                "ADMINISTRADOR": titulo,
                                                                                "CARRERA": datos.CARRERA,
                                                                                "MATERIA": datos.MATERIA,
                                                                                "GRUPO": datos.GRUPO,
                                                                                "CANTIDADESTUDIANTES": datos.CANTIDADESTUDIANTES,
                                                                                "MOTIVO": datos.MOTIVO,
                                                                                "FECHA": datos.FECHA,
                                                                                "HORA": datos.HORA,
                                                                                "PERIODO": datos.PERIODO,
                                                                                "AULA": datos.AULA,
                                                                                "CONFIRMADO": "CONFIRMADO",
                                                                                "RECHAZADO": ""
                                                                            }).then(response => {
                                                                                var periodo = reservaSeleccionada.PERIODO
                                                                                console.log(periodo, datos.AULA, reservaSeleccionada.FECHA, reservaSeleccionada.HORA)
                                                                                if (periodo == "1 Periodo") {
                                                                                    axios.post('http://cms.tis.cs.umss.edu.bo/añadirAula', {
                                                                                        "NROAULA": datos.AULA,
                                                                                        "FECHA": reservaSeleccionada.FECHA,
                                                                                        "HORA": reservaSeleccionada.HORA,
                                                                                        "DISPONIBLE": "OCUPADO",
                                                                                    }).then(response => {
                                                                                        axios.delete('http://cms.tis.cs.umss.edu.bo/eliminarReserva/' + datos.CODRESERVA).then(response => {
                                                                                            Actualizar()
                                                                                            console.log("Solicitud enviada");
                                                                                            toast.success("SOLICITUD ENVIADA", { position: "top-center" })
                                                                                        })
                                                                                    })
                                                                                }
                                                                                if (periodo == "2 Periodo") {
                                                                                    var hora1 = parseInt(reservaSeleccionada.HORA.substring(0, 2)) + 1;
                                                                                    var minuto1 = parseInt(reservaSeleccionada.HORA.substring(3, 5));
                                                                                    if (minuto1 + 30 > 60) {
                                                                                        hora1 = hora1 + 1;
                                                                                        minuto1 = minuto1 + 30 - 60;
                                                                                    } else {
                                                                                        minuto1 = minuto1 + 30;
                                                                                    }
                                                                                    if (hora1 < 10) {
                                                                                        hora1 = "0" + hora1
                                                                                    }
                                                                                    axios.post('http://cms.tis.cs.umss.edu.bo/añadirAula', {
                                                                                        "NROAULA": datos.AULA,
                                                                                        "FECHA": reservaSeleccionada.FECHA,
                                                                                        "HORA": reservaSeleccionada.HORA,
                                                                                        "DISPONIBLE": "OCUPADO",
                                                                                    }).then(response => {
                                                                                        axios.post('http://cms.tis.cs.umss.edu.bo/añadirAula', {
                                                                                            "NROAULA": datos.AULA,
                                                                                            "FECHA": reservaSeleccionada.FECHA,
                                                                                            "HORA": hora1 + ":" + minuto1,
                                                                                            "DISPONIBLE": "OCUPADO",
                                                                                        }).then(response => {
                                                                                            axios.delete('http://cms.tis.cs.umss.edu.bo/eliminarReserva/' + datos.CODRESERVA).then(response => {
                                                                                                Actualizar()
                                                                                                console.log("Solicitud enviada");
                                                                                                toast.success("SOLICITUD ENVIADA", { position: "top-center" })
                                                                                            })
                                                                                        })
                                                                                    })
                                                                                }
                                                                                if (periodo == "3 Periodo") {
                                                                                    var hora1 = parseInt(reservaSeleccionada.HORA.substring(0, 2)) + 1;
                                                                                    var minuto1 = parseInt(reservaSeleccionada.HORA.substring(3, 5));
                                                                                    if (minuto1 + 30 > 60) {
                                                                                        hora1 = hora1 + 1;
                                                                                        minuto1 = minuto1 + 30 - 60;
                                                                                    } else {
                                                                                        minuto1 = minuto1 + 30;
                                                                                    }
                                                                                    if (hora1 < 10) {
                                                                                        hora1 = "0" + hora1
                                                                                    }
                                                                                    axios.post('http://cms.tis.cs.umss.edu.bo/añadirAula', {
                                                                                        "NROAULA": datos.AULA,
                                                                                        "FECHA": reservaSeleccionada.FECHA,
                                                                                        "HORA": reservaSeleccionada.HORA,
                                                                                        "DISPONIBLE": "OCUPADO",
                                                                                    }).then(response => {
                                                                                        axios.post('http://cms.tis.cs.umss.edu.bo/añadirAula', {
                                                                                            "NROAULA": datos.AULA,
                                                                                            "FECHA": reservaSeleccionada.FECHA,
                                                                                            "HORA": hora1 + ":" + minuto1,
                                                                                            "DISPONIBLE": "OCUPADO",
                                                                                        }).then(response => {
                                                                                            hora1 = parseInt(hora1) + 1;
                                                                                            if (minuto1 + 30 > 60) {
                                                                                                hora1 = hora1 + 1;
                                                                                                minuto1 = minuto1 + 30 - 60;
                                                                                            } else {
                                                                                                minuto1 = minuto1 + 30;
                                                                                            }
                                                                                            if (hora1 < 10) {
                                                                                                hora1 = "0" + hora1
                                                                                            }
                                                                                            axios.post('http://cms.tis.cs.umss.edu.bo/añadirAula', {
                                                                                                "NROAULA": datos.AULA,
                                                                                                "FECHA": reservaSeleccionada.FECHA,
                                                                                                "HORA": hora1 + ":" + minuto1,
                                                                                                "DISPONIBLE": "OCUPADO",
                                                                                            }).then(response => {
                                                                                                axios.delete('http://cms.tis.cs.umss.edu.bo/eliminarReserva/' + datos.CODRESERVA).then(response => {
                                                                                                    Actualizar()
                                                                                                    console.log("Solicitud enviada");
                                                                                                    toast.success("SOLICITUD ENVIADA", { position: "top-center" })
                                                                                                })
                                                                                            })
                                                                                        })
                                                                                    }

                                                                                    )
                                                                                }
                                                                                axios.get('http://cms.tis.cs.umss.edu.bo/docenteEspecificoNombre/' + datos.DOCENTE).then(response => {
                                                                                    var templateParams = {
                                                                                        reserva: datos.CODRESERVA,
                                                                                        nombre: datos.DOCENTE,
                                                                                        correo: response.data[0].CORREODOCENTE,
                                                                                        carrera: datos.CARRERA,
                                                                                        materia: datos.MATERIA,
                                                                                        grupo: datos.GRUPO,
                                                                                        cantidad: datos.CANTIDADESTUDIANTES,
                                                                                        motivo: datos.MOTIVO,
                                                                                        fecha: datos.FECHA,
                                                                                        hora: datos.HORA,
                                                                                        periodo: datos.PERIODO,
                                                                                        aula: datos.AULA,
                                                                                    }

                                                                                    emailjs.send('service_3c96tqr', 'template_qgyvgkl', templateParams, 'blClZX9lrzQLi_3cY')
                                                                                        .then(function (response) {
                                                                                            console.log('SUCCESS!', response.status, response.text);
                                                                                        }, function (error) {
                                                                                            console.log('FAILED...', error);
                                                                                        });
                                                                                })

                                                                            })
                                                                        } else {
                                                                            console.log("Ingresar Aula");
                                                                            toast.error("INTRODUCIR AULA", { position: "top-center" })
                                                                        }
                                                                        /**/
                                                                    }} type="button" class="btn btn-info "> ✅</button></TableCell>
                                                                    <TableCell><button onClick={() => {
                                                                        axios.post('http://cms.tis.cs.umss.edu.bo/añadirHistorial', {
                                                                            "DOCENTE": datos.DOCENTE,
                                                                            "ADMINISTRADOR": titulo,
                                                                            "CARRERA": datos.CARRERA,
                                                                            "MATERIA": datos.MATERIA,
                                                                            "GRUPO": datos.GRUPO,
                                                                            "CANTIDADESTUDIANTES": datos.CANTIDADESTUDIANTES,
                                                                            "MOTIVO": datos.MOTIVO,
                                                                            "FECHA": datos.FECHA,
                                                                            "HORA": datos.HORA,
                                                                            "PERIODO": datos.PERIODO,
                                                                            "AULA": datos.AULA,
                                                                            "CONFIRMADO": "",
                                                                            "RECHAZADO": "RECHAZADO"
                                                                        }).then(response => {
                                                                            axios.delete('http://cms.tis.cs.umss.edu.bo/eliminarReserva/' + datos.CODRESERVA).then(response => {
                                                                                axios.get('http://cms.tis.cs.umss.edu.bo/docenteEspecificoNombre/' + datos.DOCENTE).then(response => {
                                                                                    var templateParams = {
                                                                                        reserva: datos.CODRESERVA,
                                                                                        nombre: datos.DOCENTE,
                                                                                        correo: response.data[0].CORREODOCENTE,
                                                                                        carrera: datos.CARRERA,
                                                                                        materia: datos.MATERIA,
                                                                                        grupo: datos.GRUPO,
                                                                                        cantidad: datos.CANTIDADESTUDIANTES,
                                                                                        motivo: datos.MOTIVO,
                                                                                        fecha: datos.FECHA,
                                                                                        hora: datos.HORA,
                                                                                        periodo: datos.PERIODO,
                                                                                        aula: datos.AULA,
                                                                                    }

                                                                                    emailjs.send('service_3c96tqr', 'template_x50ot9k', templateParams, 'blClZX9lrzQLi_3cY')
                                                                                        .then(function (response) {
                                                                                            console.log('SUCCESS!', response.status, response.text);
                                                                                        }, function (error) {
                                                                                            console.log('FAILED...', error);
                                                                                        });
                                                                                    Actualizar()
                                                                                    console.log("Solicitud enviada");
                                                                                    toast.success("SOLICITUD ENVIADA", { position: "top-center" })
                                                                                })
                                                                            })
                                                                        })


                                                                    }} type="button" class="btn btn-info ">❌</button></TableCell>
                                                                </TableRow>
                                                            )
                                                        } else {
                                                            return (
                                                                <TableRow>
                                                                    <TableCell>{datos.CODRESERVA}</TableCell>
                                                                    <TableCell>{datos.DOCENTE}</TableCell>
                                                                    <TableCell>{datos.CARRERA}</TableCell>
                                                                    <TableCell>{datos.MATERIA}</TableCell>
                                                                    <TableCell>{datos.GRUPO}</TableCell>
                                                                    <TableCell>{datos.CANTIDADESTUDIANTES}</TableCell>
                                                                    <TableCell>{datos.MOTIVO}</TableCell>
                                                                    <TableCell>{datos.FECHA}</TableCell>
                                                                    <TableCell>{datos.HORA}</TableCell>
                                                                    <TableCell>{datos.PERIODO}</TableCell>
                                                                </TableRow>
                                                            )
                                                        }
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div >
    )
}
