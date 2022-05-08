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
    var hay_numero = false

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
                            hayNumero(nombre)
                            if (hay_numero == false) {
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
                                                            toast.success('REGISTRO EXITOSO')
                                                            historial.push('/reserva');
                                                        } else {
                                                            console.log("Ya Existe Usuario");
                                                            toast.error("LA CUENTA YA EXISTE", {
                                                                position: "top-center"
                                                            })
                                                        }
                                                    } else {
                                                        console.log("Contraseña no coinciden");
                                                        toast.error("CONTRASEÑAS NO COINCIDEN", { position: "top-center" })
                                                    }
                                                } else {
                                                    console.log("Repetir Contraseña No Introducida");
                                                    toast.error("REPITA LA CONTRASEÑA", { position: "top-center" })
                                                }
                                            } else {
                                                console.log("Contraseña No Valida");
                                                toast.error("CONTRASEÑA INVALIDA", { position: "top-center" })
                                            }
                                        } else {
                                            console.log("Contraseña No Introducida");
                                            toast.error("INTRODUCIR CONTRASEÑA", { position: "top-center" })
                                        }
                                    } else {
                                        console.log("Correo No valido");
                                        toast.error("CORREO INVALIDO", { position: "top-center" })
                                    }
                                } else {
                                    console.log("Correo No Introducida");
                                    toast.error("INTRODUCIR CORREO", { position: "top-center" })
                                }
                            } else {
                                hay_numero = false
                                console.log("Nombre No Valido Hay Numeros");
                                toast.error("NOMBRE NO VALIDO ", { position: "top-center" })
                            }
                        } else {
                            console.log("Nombre No Valido");
                            toast.error("NOMBRE NO VALIDO", { position: "top-center" })
                        }
                    } else {
                        console.log("Nombre No Introducida");
                        toast.error("INTRODUCIR NOMBRE", { position: "top-center" })
                    }
                } else {
                    console.log("Nombre usuario no admitido");
                    toast.error("NOMBRE DE USUARIO INVALIDO ", { position: "top-center" })
                }
            } else {
                console.log("Nombre usuario Tiene que ser numeros");
                toast.error("NOMBRE DE USUARIO INVALIDO", { position: "top-center" })
            }
        } else {
            console.log("Nombre Usuario No Introducida");
            toast.error("INTRODUCIR NOMBRE DE USUARIO", { position: "top-center" })
        }
    }
    const existeCuenta = () => {
        existe = false;
    }
    const hayNumero = (nombre) => {
        console.log(nombre)
        if (nombre.indexOf('0') > 0) {
            hay_numero = true
        }
        if (nombre.indexOf('1') > 0) {
            hay_numero = true
        }
        if (nombre.indexOf('2') > 0) {
            hay_numero = true
        }
        if (nombre.indexOf('3') > 0) {
            hay_numero = true
        }
        if (nombre.indexOf('4') > 0) {
            hay_numero = true
        }
        if (nombre.indexOf('5') > 0) {
            hay_numero = true
        }
        if (nombre.indexOf('6') > 0) {
            hay_numero = true
        }
        if (nombre.indexOf('7') > 0) {
            hay_numero = true
        }
        if (nombre.indexOf('8') > 0) {
            hay_numero = true
        }
        if (nombre.indexOf('9') > 0) {
            hay_numero = true
        }
    }
    return (
        <div className='encabezado'>
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
                                    placeholder="Nombre de usuario"
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