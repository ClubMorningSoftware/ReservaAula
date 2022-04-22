import React, { useRef } from 'react'
import '../assets/css/App.css'
import { useHistory } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

export function Inicio() {

    const historial = useHistory();
    const refUsuario = useRef(null);
    const refContraseña = useRef(null);

    const Registrarse = () => {
        historial.push('/registro')
    }

    const IniciarSecion = () => {

        var usuario = refUsuario.current.value;
        var contraseña = refContraseña.current.value;
        if (usuario != "") {
            if (contraseña != "") {
                if (usuario == "201801656" && contraseña == "123456") {
                    document.title = usuario;
                    console.log("Se Inicio Sesion Correctamente");
                    toast.success('Inicio de secion correcta', { position: 'top-center' })
                    historial.push('/reserva');
                } else {
                    console.log("No Existe Usuario");
                    toast.error("Cuenta no registrada", { position: "top-center" })
                }
            } else {
                console.log("Contraseña No Introducida");
                toast.error("Introducir contraseña", { position: "top-center" })
            }
        } else {
            console.log("Codigo sis No Introducido");
            toast.error("Introducir codigo sis", { position: "top-center" })
        }
    }
    return (
        <div className='login'>
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
                                    placeholder="CODIGO SIS"
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
                                    aria-describedby="basic-addon1"
                                    ref={refContraseña}
                                />
                            </div>
                            <div class="d-grid gap-2 mt-2">
                                <button onClick={IniciarSecion} type="button" class="btn btn-info">ACCEDER</button>
                                <Toaster
                                    position="top-center"
                                    reverseOrder={false}
                                />
                            </div>
                            <div class="d-grid gap-2 mt-4">
                                <button onClick={Registrarse} type="button" class="btn btn-info">REGISTARSE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}