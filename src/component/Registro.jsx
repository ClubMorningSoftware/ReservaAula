import React, { useRef } from 'react'
import '../assets/css/App.css';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';


export function Registro() {
    const historial = useHistory();
    const refCodigoSis = useRef(null);
    const refNombre = useRef(null);
    const refCorreo = useRef(null);
    const refContraseña = useRef(null);
    const refRepetirContraseña = useRef(null);
    var existe = true;

    const Registrarse = () => {
        var codigoSis = refCodigoSis.current.value;
        var nombre = refNombre.current.value;
        var correo = refCorreo.current.value;
        var contraseña = refContraseña.current.value;
        var repetirContraseña = refRepetirContraseña.current.value;
        if (codigoSis != "") {
            if (isNaN(codigoSis) == false) {
                if (codigoSis.length == 9) {
                    if (nombre != "") {
                        if (nombre.length > 2 && nombre.length < 31) {
                            if (correo != "") {
                                if (correo.indexOf('@') > 0) {
                                    if (contraseña != "") {
                                        if (contraseña.length > 4 && contraseña.length < 31) {
                                            if (repetirContraseña != "") {
                                                if (contraseña == repetirContraseña) {
                                                    existeCuenta()
                                                    if (!existe) {
                                                        console.log("Registrado");
                                                        document.title = codigoSis;
                                                        toast.success('Registro Correcto')
                                                        historial.push('/reserva');
                                                    } else {
                                                        console.log("Ya Existe Usuario");
                                                        toast.error("Cuenta ya registrada", {
                                                            position: "top-center"
                                                        })
                                                    }
                                                } else {
                                                    console.log("Contraseña no coinciden");
                                                    toast.error("Contraseñas no coinciden", { position: "top-center" })
                                                }
                                            } else {
                                                console.log("Repetir Contraseña No Introducida");
                                                toast.error("Repita la contraseña", { position: "top-center" })
                                            }
                                        } else {
                                            console.log("Contraseña No Valida");
                                            toast.error("Contraseña invalida", { position: "top-center" })
                                        }
                                    } else {
                                        console.log("Contraseña No Introducida");
                                        toast.error("Introducir contraseña", { position: "top-center" })
                                    }
                                } else {
                                    console.log("Correo No valido");
                                    toast.error("Correo no valido", { position: "top-center" })
                                }
                            } else {
                                console.log("Correo No Introducida");
                                toast.error("Introducir correo", { position: "top-center" })
                            }
                        } else {
                            console.log("Nombre No Valido");
                            toast.error("Nombre no valido", { position: "top-center" })
                        }
                    } else {
                        console.log("Nombre No Introducida");
                        toast.error("Introducir Nombre", { position: "top-center" })
                    }
                } else {
                    console.log("Codigo Sis no admitido");
                    toast.error("Codigo Sis no admitido", { position: "top-center" })
                }
            } else {
                console.log("Codigo Sis Tiene que ser numeros");
                toast.error("Codigo Sis Tiene que ser numeros", { position: "top-center" })
            }
        } else {
            console.log("Codigo Sis No Introducida");
            toast.error("Introducir codigo sis", { position: "top-center" })
        }
    }
    const existeCuenta = () => {
        existe = false;
    }
    return (
        <div className='login'>
            <div className="row">
                <div className="col-sm-4 offset-4 mt-5">
                    <div className="card pt-5">
                        <div className="card-header">
                            <h3>👨🏻‍🏫 REGISTRARSE</h3>
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
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    ref={refCodigoSis}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon2">
                                    👤
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    ref={refNombre}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon3">
                                    📧
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Correo"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    ref={refCorreo}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon4">
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
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon5">
                                    🔒
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Repetir Contraseña"
                                    aria-label="Repetir Contraseña"
                                    aria-describedby="basic-addon1"
                                    ref={refRepetirContraseña}
                                />
                            </div>
                            <div class="d-grid gap-2">
                                <button onClick={Registrarse} type="button" class="btn btn-info">ACCEDER</button>
                                <Toaster
                                    position="top-center"
                                    reverseOrder={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}