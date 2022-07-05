import React, { useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '@material-ui/core/Modal';

export function Perfil() {
    const historial = useHistory();
    const titulo = document.title;
    const [nombreUsuario, setNombreUsuario] = useState("")
    const [correo, setCorreo] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [modalNombre, setModalNombre] = useState(false)
    const [modalUsuario, setModalUsuario] = useState(false)
    const [modalContraseña, setModalContraseña] = useState(false)
    const [modalCorreo, setModalCorreo] = useState(false)
    const [codigo, setCodigo] = useState("")
    const refNombreUsuario = useRef(null);
    const refNombre = useRef(null);
    const refCorreo = useRef(null);
    const refContraseña = useRef(null);

    if (titulo=="Reserva Aulas"){
        historial.push('/')
    }


    window.onbeforeunload = function (e) {
        return "You have some unsaved changes"
    };
    
    useEffect(() => {
        axios.get('http://cms.tis.cs.umss.edu.bo/docenteEspecificoNombre/' + titulo).then(response => {
            setNombreUsuario(response.data[0].NOMBREUSUARIO)
            setCorreo(response.data[0].CORREODOCENTE)
            setContraseña(response.data[0].CONTRASENADOCENTE)
            setCodigo(response.data[0].CODDOCENTE)
        })
    }, [])

    const Atras = () => {
        historial.push('/reserva')
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
                        <button onClick={Atras} type="button" class="btn btn-info sm-1 offset-1 mt-3">Atras</button>
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
                        <div className="card-header">
                            <div className='encabezado'>
                                <h4> PERFIL </h4>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <h3>Nombre Completo :  {titulo} </h3>
                                </div>
                                <div className="col-sm-2">
                                    <button onClick={() => {
                                        setModalNombre(!modalNombre);
                                    }} type="button" class="btn btn-info ">✏️</button>
                                    <Modal
                                        open={modalNombre}
                                    >
                                        <div className='contenedorModalEditar'>
                                            <div className='containerEncabezadoModalPerfil'>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <h3 className='mt-3'>EDITAR NOMBRE COMPLETO</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='contenedorCerrarPerfil'>
                                                    <button onClick={() => {
                                                        setModalNombre(!modalNombre);
                                                    }} type="button" class="btn btn-info ">❌</button>
                                                </div>
                                            </div>
                                            <div className='containerEditar'>
                                                <div class="input-group mb-3">
                                                    <span class="input-group-text">👤</span>
                                                    <input type="text" class="form-control" id="campoNombreCompleto" placeholder={titulo} ref={refNombre} />
                                                </div>
                                                <button onClick={() => {
                                                    if (refNombre.current.value != "") {
                                                        axios.put('http://cms.tis.cs.umss.edu.bo/editarNombre/' + codigo, {
                                                            "NOMBREDOCENTE": refNombre.current.value
                                                        }).then(response => {
                                                            axios.get('http://cms.tis.cs.umss.edu.bo/docenteEspecificoNombre/' + refNombre.current.value).then(response => {
                                                                document.title = response.data[0].NOMBREDOCENTE
                                                                setModalNombre(!modalNombre);
                                                                console.log("Editado");
                                                                toast.success("NOMBRE EDITADO", {
                                                                    position: "top-center"
                                                                })
                                                            })
                                                        })
                                                    } else {
                                                        toast.error("INGRESAR NOMBRE", {
                                                            position: "top-center"
                                                        })
                                                    }
                                                }} type="button" class="btn btn-info offset-4">Guardar</button>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <h3>Nombre Usuario :  {nombreUsuario}</h3>
                                </div>
                                <div className="col-sm-2">
                                    <button onClick={() => {
                                        setModalUsuario(!modalUsuario);
                                    }} type="button" class="btn btn-info ">✏️</button>
                                    <Modal
                                        open={modalUsuario}>
                                        <div className='contenedorModalEditar'>
                                            <div className='containerEncabezadoModalPerfil'>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <h3 className='mt-3'>EDITAR NOMBRE USUARIO</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='contenedorCerrarPerfil'>
                                                    <button onClick={() => {
                                                        setModalUsuario(!modalUsuario);
                                                    }} type="button" class="btn btn-info ">❌</button>
                                                </div>
                                            </div>
                                            <div className='containerEditar'>
                                                <div class="input-group mb-3">
                                                    <span class="input-group-text" id="campoNombreUsuario">👤</span>
                                                    <input type="text" class="form-control" placeholder={nombreUsuario} ref={refNombreUsuario} />
                                                </div>
                                                <button onClick={() => {
                                                    if (refNombreUsuario.current.value != "") {
                                                        axios.put('http://cms.tis.cs.umss.edu.bo/editarUsuario/' + codigo, {
                                                            "NOMBREUSUARIO": refNombreUsuario.current.value
                                                        }).then(response => {
                                                            axios.get('http://cms.tis.cs.umss.edu.bo/docenteEspecificoNombre/' + titulo).then(response => {
                                                                setModalUsuario(!modalUsuario);
                                                                setNombreUsuario(response.data[0].NOMBREUSUARIO)
                                                                console.log("Editado");
                                                                toast.success("NOMBRE USUARIO EDITADO", {
                                                                    position: "top-center"
                                                                })
                                                            })
                                                        })
                                                    } else {
                                                        toast.error("INGRESAR NOMBRE USUARIO", {
                                                            position: "top-center"
                                                        })
                                                    }

                                                }} type="button" class="btn btn-info offset-4">Guardar</button>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <h3>Correo :  {correo}</h3>
                                </div>
                                <div className="col-sm-2">
                                    <button onClick={() => {
                                        setModalCorreo(!modalCorreo);
                                    }} type="button" class="btn btn-info ">✏️</button>
                                    <Modal
                                        open={modalCorreo}>
                                        <div className='contenedorModalEditar'>
                                            <div className='containerEncabezadoModalPerfil'>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <h3 className='mt-3'>EDITAR CORREO</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='contenedorCerrarPerfil'>
                                                    <button onClick={() => {
                                                        setModalCorreo(!modalCorreo);
                                                    }} type="button" class="btn btn-info ">❌</button>
                                                </div>
                                            </div>
                                            <div className='containerEditar'>
                                                <div class="input-group mb-3">
                                                    <span class="input-group-text" id="campoCorreo">📧</span>
                                                    <input type="text" class="form-control" placeholder={correo} ref={refCorreo} />
                                                </div>
                                                <button onClick={() => {
                                                    axios.put('http://cms.tis.cs.umss.edu.bo/editarCorreo/' + codigo, {
                                                        "CORREODOCENTE": refCorreo.current.value
                                                    }).then(response => {
                                                        axios.get('http://cms.tis.cs.umss.edu.bo/docenteEspecificoNombre/' + titulo).then(response => {
                                                            setModalCorreo(!modalCorreo);
                                                            setCorreo(response.data[0].CORREODOCENTE)
                                                            console.log("Editado");
                                                            toast.success("CORREO EDITADO", {
                                                                position: "top-center"
                                                            })
                                                        })
                                                    })
                                                }} type="button" class="btn btn-info offset-4">Guardar</button>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <h3>Contraseña :  {contraseña}</h3>
                                </div>
                                <div className="col-sm-2">
                                    <button onClick={() => {
                                        setModalContraseña(!modalContraseña);
                                    }} type="button" class="btn btn-info ">✏️</button>
                                    <Modal
                                        open={modalContraseña}>
                                        <div className='contenedorModalEditar'>
                                            <div className='containerEncabezadoModalPerfil'>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <h3 className='mt-3'>EDITAR CONTRASEÑA</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='contenedorCerrarPerfil'>
                                                    <button onClick={() => {
                                                        setModalContraseña(!modalContraseña);
                                                    }} type="button" class="btn btn-info ">❌</button>
                                                </div>
                                            </div>
                                            <div className='containerEditar'>
                                                <div class="input-group mb-3">
                                                    <span class="input-group-text" id="campoContraseña">🔒</span>
                                                    <input type="text" class="form-control" placeholder={contraseña} ref={refContraseña} />
                                                </div>
                                                <button onClick={() => {
                                                    axios.put('http://cms.tis.cs.umss.edu.bo/editarContraseña/' + codigo, {
                                                        "CONTRASENADOCENTE": refContraseña.current.value
                                                    }).then(response => {
                                                        axios.get('http://cms.tis.cs.umss.edu.bo/docenteEspecificoNombre/' + titulo).then(response => {
                                                            setModalContraseña(!modalContraseña);
                                                            setContraseña(response.data[0].CONTRASENADOCENTE)
                                                            console.log("Editado");
                                                            toast.success("CONTRASEÑA EDITADO", {
                                                                position: "top-center"
                                                            })
                                                        })
                                                    })
                                                }} type="button" class="btn btn-info offset-4">Guardar</button>
                                            </div>
                                        </div>
                                    </Modal>
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
        </div>
    )
}