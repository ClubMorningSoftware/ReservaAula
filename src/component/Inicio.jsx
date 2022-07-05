import React, { useRef, useState } from 'react'
import '../assets/css/App.css'
import { useHistory } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

export function Inicio() {

    const historial = useHistory();
    const refUsuario = useRef(null);
    const refContraseña = useRef(null);
    const Registrarse = () => {
        historial.push('/registro')
    }

    const IniciarSeSion = () => {
        var usuario = refUsuario.current.value;
        var contraseña = refContraseña.current.value;
        if (usuario != "") {
            if (contraseña != "") {
                axios.get('http://cms.tis.cs.umss.edu.bo/docenteEspecifico/' + usuario).then(response => {
                    var datos = response.data
                    if (datos.length == 1) {
                        var nombreBd = datos[0].NOMBREDOCENTE
                        var usuarioBd = datos[0].NOMBREUSUARIO
                        var contraseñaBd = datos[0].CONTRASENADOCENTE
                        if (usuarioBd == usuario) {
                            if (contraseñaBd == contraseña) {
                                document.title = nombreBd
                                console.log("Se Inicio Sesion Correctamente");
                                toast.success('INICIO DE SESION CORRECTAMENTE', { position: 'top-center' })
                                historial.push('/reserva');
                            } else {
                                console.log("Contraseña incorrecta");
                                toast.error("CONTRASEÑA INCORRECTA", { position: "top-center" })
                            }
                        }else{
                            console.log("No Existe Usuario");
                                    toast.error("CUENTA NO REGISTRADA", { position: "top-center" })
                        }
                    } else {
                        axios.get('http://cms.tis.cs.umss.edu.bo/administradorEspecifico/' + usuario).then(response => {
                            var datosAdmi = response.data
                            console.log(datosAdmi)
                            if (datosAdmi.length == 1) {
                                var nombreBd = datosAdmi[0].NOMBREADMINISTRADOR
                                var usuarioBd = datosAdmi[0].USUARIOADMINISTRADOR
                                var contraseñaBd = datosAdmi[0].CONTRASENAADMINISTRADOR
                                if (usuarioBd == usuario) {
                                    if (contraseñaBd == contraseña) {
                                        document.title = nombreBd
                                        console.log("Se Inicio Sesion Correctamente");
                                        toast.success('INICIO DE SESION CORRECTAMENTE', { position: 'top-center' })
                                        historial.push('/administrador');
                                    } else {
                                        console.log("Contraseña incorrecta");
                                        toast.error("CONTRASEÑA INCORRECTA", { position: "top-center" })
                                    }
                                } else {
                                    console.log("No Existe Usuario");
                                    toast.error("CUENTA NO REGISTRADA", { position: "top-center" })
                                }
                            } else {
                                console.log("No Existe Usuario");
                                toast.error("CUENTA NO REGISTRADA", { position: "top-center" })
                            }
                        });
                    }
                })

            } else {
                console.log("Contraseña No Introducida");
                toast.error("INTRODUCIR CONTRASEÑA", { position: "top-center" })
            }
        } else {
            console.log("Codigo sis No Introducido");
            toast.error("INTRODUCIR NOMBRE DE USUARIO", { position: "top-center" })
        }
    }

    return (
        <div className='encabezado'>
            <div className="row">
                <div className="col-sm-4 offset-4 mt-5">
                    <div className="card pt-5">
                        <div className="card-header">

                            <h3>👨🏻‍🏫 INICIAR SESION</h3>
                        </div>
                        <div className="card-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">
                                    👤
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre de usuario"
                                    name='codigoSisDocente'
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    ref={refUsuario}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon2">
                                    🔒
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    aria-label="Contraseña"
                                    aria-describedby="basic-addon2"
                                    ref={refContraseña}
                                />
                            </div>
                            <div className="d-grid gap-2 mt-2">
                                <button onClick={IniciarSeSion} type="button" class="btn btn-info">ACCEDER</button>
                                <Toaster
                                    position="top-center"
                                    reverseOrder={false}
                                />
                            </div>
                            <div className="d-grid gap-2 mt-4">
                                <button onClick={Registrarse} type="button" class="btn btn-info">REGISTARSE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}