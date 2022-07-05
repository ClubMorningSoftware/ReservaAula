import React, { useRef } from 'react'
import '../assets/css/App.css';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import Modal from '@material-ui/core/Modal';
import { useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';

export function Registro() {
    const historial = useHistory();
    const refNombreUsuario = useRef(null);
    const refNombre = useRef(null);
    const refCorreo = useRef(null);
    const refContraseña = useRef(null);
    const refRepetirContraseña = useRef(null);
    var hay_numero = false
    const [modal, setModal] = useState(false)
    const [carrera, setCarrera] = useState([]);
    const [materia1, setMateria1] = useState([]);
    const [materia2, setMateria2] = useState([]);
    const [materia3, setMateria3] = useState([]);
    const [materia4, setMateria4] = useState([]);
    const [materia5, setMateria5] = useState([]);
    const refCarrera1 = useRef(null);
    const refCarrera2 = useRef(null);
    const refCarrera3 = useRef(null);
    const refCarrera4 = useRef(null);
    const refCarrera5 = useRef(null);
    //lista materias
    const [refMateria1, setRefMateria1] = useState([]);
    const [refMateria2, setRefMateria2] = useState([]);
    const [refMateria3, setRefMateria3] = useState([]);
    const [refMateria4, setRefMateria4] = useState([]);
    const [refMateria5, setRefMateria5] = useState([]);
    const [carrera1, setCarrera1] = useState(0);
    const [carrera2, setCarrera2] = useState(0);
    const [carrera3, setCarrera3] = useState(0);
    const [carrera4, setCarrera4] = useState(0);
    const [carrera5, setCarrera5] = useState(0);
    const [registroCarrera, setRegistroCarrera] = useState(false)
    const [hayCarrera1, setHayCarrera1] = useState(false)
    const [hayCarrera2, setHayCarrera2] = useState(false)
    const [hayCarrera3, setHayCarrera3] = useState(false)
    const [hayCarrera4, setHayCarrera4] = useState(false)
    const [hayCarrera5, setHayCarrera5] = useState(false)

    const abrirCerrarModal = () => {
        setModal(!modal);
    }
    const peticionGet = async () => {
        axios.get('http://cms.tis.cs.umss.edu.bo/carrerasUmss').then(response => {
            setCarrera(response.data);
        })
    }
    useEffect(() => {
        peticionGet();
    }, [])
    const Registrarse = async () => {
        var nombreUsuario = refNombreUsuario.current.value;
        var nombre = refNombre.current.value;
        var correo = refCorreo.current.value;
        var contraseña = refContraseña.current.value;
        var repetirContraseña = refRepetirContraseña.current.value;
        if (nombreUsuario != "") {
            if (nombreUsuario.length > 3 && nombreUsuario.length < 15) {
                if (nombre != "") {
                    if (nombre.length > 2 && nombre.length < 31) {
                        hayNumero(nombre)
                        if (hay_numero == false) {
                            if (correo != "") {
                                if (correo.indexOf("@fcyt.umss.edu.bo") > 0) {
                                    if (contraseña != "") {
                                        if (contraseña.length > 4 && contraseña.length < 31) {
                                            if (repetirContraseña != "") {
                                                if (contraseña == repetirContraseña) {
                                                    axios.get('http://cms.tis.cs.umss.edu.bo/docenteEspecifico/' + nombreUsuario).then(response => {
                                                        if (response.data.length > 0) {
                                                            console.log("Ya Existe Usuario");
                                                            toast.error("LA CUENTA YA EXISTE", {
                                                                position: "top-center"
                                                            })
                                                        } else {
                                                            if (registroCarrera) {
                                                                añadirBaseDatos(nombre, nombreUsuario, correo, contraseña)
                                                            } else {
                                                                console.log("Seleccionar Carrera");
                                                                toast.error("SELECCIONAR CARRERA Y MATERIA", {
                                                                    position: "top-center"
                                                                })
                                                            }
                                                        }
                                                    })
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
            console.log("Nombre Usuario No Introducida");
            toast.error("INTRODUCIR NOMBRE DE USUARIO", { position: "top-center" })
        }
        //console.log(carrera1);//la carrera
        //console.log(refMateria1);//la lista materia
    }
    const añadirMateria = (codigoDocente, nombreUsuario) => {
        if (hayCarrera1) {
            refMateria1.map((item) => {
                const obj = new FormData()
                obj.append("CODMATERIA", item.CODMATERIAUMSS);
                obj.append("CODCARRERA", item.CODUMSSCARRERA);
                obj.append("NOMBREMATERIA", item.NOMBREMATERIAUMSS);
                obj.append("CODDOCENTE", codigoDocente);
                axios.post('http://cms.tis.cs.umss.edu.bo/añadirMateria', obj).then(response => {
                })
            })
        }
        if (hayCarrera2) {
            refMateria2.map((item) => {
                const obj = new FormData()
                obj.append("CODMATERIA", item.CODMATERIAUMSS);
                obj.append("CODCARRERA", item.CODUMSSCARRERA);
                obj.append("NOMBREMATERIA", item.NOMBREMATERIAUMSS);
                obj.append("CODDOCENTE", codigoDocente);
                console.log("1")
                axios.post('http://cms.tis.cs.umss.edu.bo/añadirMateria', obj).then(response => {
                })
            })
        }
        if (hayCarrera3) {
            refMateria3.map((item) => {
                const obj = new FormData()
                obj.append("CODMATERIA", item.CODMATERIAUMSS);
                obj.append("CODCARRERA", item.CODUMSSCARRERA);
                obj.append("NOMBREMATERIA", item.NOMBREMATERIAUMSS);
                obj.append("CODDOCENTE", codigoDocente);
                axios.post('http://cms.tis.cs.umss.edu.bo/añadirMateria', obj).then(response => {
                })
            })
        }
        if (hayCarrera4) {
            refMateria4.map((item) => {
                const obj = new FormData()
                obj.append("CODMATERIA", item.CODMATERIAUMSS);
                obj.append("CODCARRERA", item.CODUMSSCARRERA);
                obj.append("NOMBREMATERIA", item.NOMBREMATERIAUMSS);
                obj.append("CODDOCENTE", codigoDocente);
                axios.post('http://cms.tis.cs.umss.edu.bo/añadirMateria', obj).then(response => {
                })
            })
        }
        if (hayCarrera5) {
            refMateria5.map((item) => {
                const obj = new FormData()
                obj.append("CODMATERIA", item.CODMATERIAUMSS);
                obj.append("CODCARRERA", item.CODUMSSCARRERA);
                obj.append("NOMBREMATERIA", item.NOMBREMATERIAUMSS);
                obj.append("CODDOCENTE", codigoDocente);
                axios.post('http://cms.tis.cs.umss.edu.bo/añadirMateria', obj).then(response => {
                })
            })
        } axios.get('http://cms.tis.cs.umss.edu.bo/docenteEspecifico/' + nombreUsuario).then(response => {
            var datos = response.data
            var nombreBd = datos[0].NOMBREDOCENTE
            console.log("Registrado");
            document.title = nombreBd;
            toast.success('REGISTRO EXITOSO')
            historial.push('/reserva');
        })


    }
    const añadirCarrera = (codigoDocente, nombreUsuario) => {
        if (hayCarrera1) {
            axios.get('http://cms.tis.cs.umss.edu.bo/soloCarrera/' + carrera1).then(response => {
                var datos = response.data
                if (datos.length == 1) {
                    const obj = new FormData()
                    obj.append("CODCARRERA", datos[0].CODUMSSCARRERA)
                    obj.append("CODDOCENTE", codigoDocente)
                    obj.append("NOMBRECARRERA", datos[0].NOMBRECARRERAUMSS)
                    axios.post('http://cms.tis.cs.umss.edu.bo/añadirCarrera', obj).then(response => {
                        añadirMateria(codigoDocente, nombreUsuario)
                    })
                }
            })
        }
        if (hayCarrera2) {
            axios.get('http://cms.tis.cs.umss.edu.bo/soloCarrera/' + carrera2).then(response => {
                var datos = response.data
                if (datos.length == 1) {
                    const obj = new FormData()
                    obj.append("CODCARRERA", datos[0].CODUMSSCARRERA)
                    obj.append("CODDOCENTE", codigoDocente)
                    obj.append("NOMBRECARRERA", datos[0].NOMBRECARRERAUMSS)
                    axios.post('http://cms.tis.cs.umss.edu.bo/añadirCarrera', obj).then(response => {

                    })
                }
            })
        }
        if (hayCarrera3) {
            axios.get('http://cms.tis.cs.umss.edu.bo/soloCarrera/' + carrera3).then(response => {
                var datos = response.data
                if (datos.length == 1) {
                    const obj = new FormData()
                    obj.append("CODCARRERA", datos[0].CODUMSSCARRERA)
                    obj.append("CODDOCENTE", codigoDocente)
                    obj.append("NOMBRECARRERA", datos[0].NOMBRECARRERAUMSS)
                    axios.post('http://cms.tis.cs.umss.edu.bo/añadirCarrera', obj).then(response => {

                    })
                }
            })
        }
        if (hayCarrera4) {
            axios.get('http://cms.tis.cs.umss.edu.bo/soloCarrera/' + carrera4).then(response => {
                var datos = response.data
                if (datos.length == 1) {
                    const obj = new FormData()
                    obj.append("CODCARRERA", datos[0].CODUMSSCARRERA)
                    obj.append("CODDOCENTE", codigoDocente)
                    obj.append("NOMBRECARRERA", datos[0].NOMBRECARRERAUMSS)
                    axios.post('http://cms.tis.cs.umss.edu.bo/añadirCarrera', obj).then(response => {

                    })
                }
            })
        }
        if (hayCarrera5) {
            axios.get('http://cms.tis.cs.umss.edu.bo/soloCarrera/' + carrera5).then(response => {
                var datos = response.data
                if (datos.length == 1) {
                    const obj = new FormData()
                    obj.append("CODCARRERA", datos[0].CODUMSSCARRERA)
                    obj.append("CODDOCENTE", codigoDocente)
                    obj.append("NOMBRECARRERA", datos[0].NOMBRECARRERAUMSS)
                    axios.post('http://cms.tis.cs.umss.edu.bo/añadirCarrera', obj).then(response => {

                    })
                }
            })
        }

    }
    const añadirBaseDatos = (nombre, nombreUsuario, correo, contraseña) => {
        const obj = new FormData()
        obj.append("NOMBREUSUARIO", nombreUsuario)
        obj.append("CORREODOCENTE", correo)
        obj.append("CONTRASENADOCENTE", contraseña)
        obj.append("NOMBREDOCENTE", nombre)
        axios.post('http://cms.tis.cs.umss.edu.bo/añadirDocente', obj).then(response => {
            axios.get('http://cms.tis.cs.umss.edu.bo/docenteEspecifico/' + nombreUsuario).then(response => {
                añadirCarrera(response.data[0].CODDOCENTE, nombreUsuario)
            })
        })
    }
    const hayNumero = (nombre) => {
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
    const guardarCarrera = () => {
        if (refCarrera1.current.value > 0) {
            if (refMateria1[0].CODMATERIAUMSS > 0) {
                setRegistroCarrera(true)
                setHayCarrera1(true)
                setCarrera1(refCarrera1.current.value)
            }
        }
        if (refCarrera2.current.value > 0) {
            if (refMateria2[0].CODMATERIAUMSS > 0) {
                setRegistroCarrera(true)
                setHayCarrera2(true)
                setCarrera2(refCarrera2.current.value)
            }
        }
        if (refCarrera3.current.value > 0) {
            if (refMateria3[0].CODMATERIAUMSS > 0) {
                setRegistroCarrera(true)
                setHayCarrera3(true)
                setCarrera3(refCarrera3.current.value)
            }
        }
        if (refCarrera4.current.value > 0) {
            if (refMateria4[0].CODMATERIAUMSS > 0) {
                setRegistroCarrera(true)
                setHayCarrera4(true)
                setCarrera4(refCarrera4.current.value)
            }
        }
        if (refCarrera5.current.value > 0) {
            if (refMateria5[0].CODMATERIAUMSS > 0) {
                setRegistroCarrera(true)
                setHayCarrera5(true)
                setCarrera5(refCarrera5.current.value)
            }
        }
        abrirCerrarModal()
    }
    const cargarMaterias1 = function (e) {
        const opcion = e.target.value;
        axios.get('http://cms.tis.cs.umss.edu.bo/materiaCarrera/' + opcion).then(response => {
            setMateria1(response.data);
        })
    }
    const cargarMaterias2 = function (e) {
        const opcion = e.target.value;
        console.log(opcion)
        axios.get('http://cms.tis.cs.umss.edu.bo/materiaCarrera/' + opcion).then(response => {
            setMateria2(response.data);
        })

    }
    const cargarMaterias3 = function (e) {
        const opcion = e.target.value;
        console.log(opcion)
        axios.get('http://cms.tis.cs.umss.edu.bo/materiaCarrera/' + opcion).then(response => {
            setMateria3(response.data);
        })

    }
    const cargarMaterias4 = function (e) {
        const opcion = e.target.value;
        console.log(opcion)
        axios.get('http://cms.tis.cs.umss.edu.bo/materiaCarrera/' + opcion).then(response => {
            setMateria4(response.data);
        })

    }
    const cargarMaterias5 = function (e) {
        const opcion = e.target.value;
        axios.get('http://cms.tis.cs.umss.edu.bo/materiaCarrera/' + opcion).then(response => {
            setMateria5(response.data);
        })
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
                                    aria-describedby="basic-addon3"
                                    ref={refNombreUsuario}
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
                                    aria-describedby="basic-addon4"
                                    ref={refNombre}
                                />
                            </div>
                            <div className="input-group mb-3 mt-3">
                                <span className="input-group-text" id="basic-addon3">
                                    📧
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Correo"
                                    aria-label="Correo"
                                    aria-describedby="basic-addon5"
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
                                    aria-describedby="basic-addon6"
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
                                    aria-describedby="basic-addon7"
                                    ref={refRepetirContraseña}
                                />
                            </div>
                            <div className='row mt-2'>
                                <div className='col-sm-3'>
                                    <h5>
                                        Carreras:
                                    </h5>
                                </div>
                                <div className='col'>
                                    <button onClick={() => {
                                        setModal(!modal);
                                    }} type="button" class="btn btn-info ">Añadir Carreras </button>
                                    <Modal open={modal}>
                                        <div className='contenedorModalRegistro'>
                                            <div className='containerEncabezadoModalRegistro'>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <h3 className='mt-3'>Carreras "FCYT"</h3>
                                                    </div>
                                                    <div className='col'>
                                                        <h3 className='mt-3 offset-8'>
                                                            <button onClick={abrirCerrarModal} type="button" class="btn btn-info ">❌</button>
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='contenedorSelec'>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <select class="form-select" name='carrerasUmss1' id='selectCarreras1' onClick={cargarMaterias1} ref={refCarrera1}>
                                                            <option value={-1}>Seleccione Carrera</option>
                                                            {
                                                                carrera.map((item) => (
                                                                    <option value={item.CODUMSSCARRERA}>{item.NOMBRECARRERAUMSS}</option>
                                                                )
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className='col'>
                                                        <Multiselect
                                                            options={materia1}
                                                            displayValue="NOMBREMATERIAUMSS"
                                                            placeholder='Seleccione Materia'
                                                            onSelect={(event) => { setRefMateria1(event) }}
                                                        >
                                                        </Multiselect>
                                                    </div>
                                                </div>
                                                <div className='row mt-4'>
                                                    <div className='col'>
                                                        <select class="form-select" name='carrerasUmss2' id='selectCarreras2' onClick={cargarMaterias2} ref={refCarrera2}>
                                                            <option value={-1}>Seleccione Carrera</option>
                                                            {
                                                                carrera.map((item) => (
                                                                    <option value={item.CODUMSSCARRERA}>{item.NOMBRECARRERAUMSS}</option>
                                                                )
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className='col'>
                                                        <Multiselect
                                                            options={materia2}
                                                            displayValue="NOMBREMATERIAUMSS"
                                                            placeholder='Seleccione Materia'
                                                            onSelect={(event) => { setRefMateria2(event) }}
                                                        >
                                                        </Multiselect>
                                                    </div>
                                                </div>
                                                <div className='row mt-4'>
                                                    <div className='col'>
                                                        <select class="form-select" name='carrerasUmss3' id='selectCarreras3' onClick={cargarMaterias3} ref={refCarrera3}>
                                                            <option value={-1}>Seleccione Carrera</option>
                                                            {
                                                                carrera.map((item) => (
                                                                    <option value={item.CODUMSSCARRERA}>{item.NOMBRECARRERAUMSS}</option>
                                                                )
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className='col'>
                                                        <Multiselect
                                                            options={materia3}
                                                            displayValue="NOMBREMATERIAUMSS"
                                                            placeholder='Seleccione Materia'
                                                            onSelect={(event) => { setRefMateria3(event) }}
                                                        >
                                                        </Multiselect>
                                                    </div>
                                                </div>
                                                <div className='row mt-4'>
                                                    <div className='col'>
                                                        <select class="form-select" name='carrerasUmss4' id='selectCarreras4' onClick={cargarMaterias4} ref={refCarrera4}>
                                                            <option value={-1}>Seleccione Carrera</option>
                                                            {
                                                                carrera.map((item) => (
                                                                    <option value={item.CODUMSSCARRERA}>{item.NOMBRECARRERAUMSS}</option>
                                                                )
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className='col'>
                                                        <Multiselect
                                                            options={materia4}
                                                            displayValue="NOMBREMATERIAUMSS"
                                                            placeholder='Seleccione Materia'
                                                            onSelect={(event) => { setRefMateria4(event) }}
                                                        >
                                                        </Multiselect>
                                                    </div>
                                                </div>
                                                <div className='row mt-4'>
                                                    <div className='col'>
                                                        <select class="form-select" name='carrerasUmss5' id='selectCarreras5' onClick={cargarMaterias5} ref={refCarrera5}>
                                                            <option value={-1}>Seleccione Carrera</option>
                                                            {
                                                                carrera.map((item) => (
                                                                    <option value={item.CODUMSSCARRERA}>{item.NOMBRECARRERAUMSS}</option>
                                                                )
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className='col'>
                                                        <Multiselect
                                                            options={materia5}
                                                            displayValue="NOMBREMATERIAUMSS"
                                                            placeholder='Seleccione Materia'
                                                            onSelect={(event) => { setRefMateria5(event) }}
                                                        >
                                                        </Multiselect>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <button onClick={guardarCarrera} type="button" class="btn btn-info offset-4 ">Guardar Carrera(s)</button>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                            <div className="d-grid gap-2 mt-4">
                                <button onClick={Registrarse} type="button" class="btn btn-info">ACCEDER</button>
                                <Toaster
                                    position="top-center"
                                    reverseOrder={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}