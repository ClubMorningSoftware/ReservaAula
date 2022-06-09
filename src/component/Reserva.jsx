import React, { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

export function Reserva() {
    const historial = useHistory();
    const titulo = document.title;
    const refCarrera = useRef(null);
    const refMateria = useRef(null);
    const refGrupo = useRef(null);
    const refCantidadEstudiantes = useRef(null);
    const refMotivo = useRef(null);
    const refFecha = useRef(null);
    const refHora = useRef(null);
    const refPeriodo = useRef(null);

    /*const mayuscula = (event) => {
        event.preventDefault();
        setNroAula(event.target.value.toUpperCase());
    }*/

    const esBisiesto = (year) => {
        return (year % 400 === 0) ? true : 
                    (year % 100 === 0) ? false : 
                        year % 4 === 0;
      };

    const FechaValida = (fecha) => {
        var esValido = true
        var año = parseInt(fecha.substring(2,4))
        var mes = parseInt(fecha.substring(5,7))
        var diaFecha = parseInt(fecha.substring(8,10))
        var valor
        if (mes == 1){
            if (esBisiesto(año)){
                valor  = 6
            }else{
                valor = 0
            }
            
        }else{
            if (mes == 2){
                if (esBisiesto(año)){
                    valor  = 2
                  }else{
                    valor = 3
                  }
            }else{
                if (mes == 3){
                    valor = 3
                }else{
                    if (mes == 4){
                        valor = 6
                    }else{
                        if (mes == 5){
                            valor = 1
                        }else{
                            if (mes == 6){
                                valor = 4
                            }else{
                                if (mes == 7){
                                    valor = 6
                                }else{
                                    if (mes == 8){
                                        valor = 2
                                    }else{
                                        if (mes == 9){
                                            valor = 5
                                        }else{
                                            if (mes == 10){
                                                valor = 0
                                            }else{
                                                if (mes == 11){
                                                    valor = 3
                                                }else{
                                                    valor = 5
                                                }   
                                            }   
                                        }   
                                    }   
                                }   
                            }   
                        }   
                    }   
                }   
            }
        }
        var dia = (((diaFecha+valor+año+(año/4)+6)%7)) 
        console.log(dia)
        if (dia < 1){
            esValido = false
            console.log("Fecha Invalida")  
        }else{
            esValido = true
            console.log("Fecha Valida")
        }
        return esValido
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

    const editarTodo  = () => {
        document.getElementById("CarreraInterfaz").value="Seleccionar Carrera";
        document.getElementById("MateriaInterfaz").value="Seleccionar Materia";
        document.getElementById("grupoInterfaz").value="";
        document.getElementById("estudiantesInterfaz").value="";
        document.getElementById("motivoInterfaz").value="Seleccionar Motivo";
        document.getElementById("fechaInterfaz").value="";
        document.getElementById("horaInterfaz").value="";
        document.getElementById("periodoInterfaz").value="Seleccionar Periodo";
        console.log("editado")
    }

    const EnviarSolicitud = () => {
        var carrera = refCarrera.current.value;
        var materia = refMateria.current.value;
        var grupo = refGrupo.current.value;
        var cantidadEstudiantes = refCantidadEstudiantes.current.value;
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
                                if (motivo != "Seleccionar Motivo") {
                                    if (fecha != "") {
                                        const fechaActual = new Date().toISOString();
                                        if (fecha > fechaActual) {
                                            if (FechaValida(fecha)){
                                                if (hora != "") {
                                                    if (hora.substring(0, 2) > 5 && hora.substring(0, 2) < 18) {
                                                        if (hora.substring(0, 2) == 6) {
                                                            if (hora.substring(3, 5) > 44) {
                                                                if (periodo != "Seleccionar Periodo") {
                                                                    console.log("Solicitud enviada");
                                                                    toast.success("SOLICITUD ENVIADA", { position: "top-center" })
                                                                } else {
                                                                    console.log("Seleccionar Periodo");
                                                                    toast.error("SELECCIONAR PERIODO", { position: "top-center" })
                                                                }
                                                            } else {
                                                                console.log("Hora Invalida");
                                                                toast.error("HORA INVALIDA", { position: "top-center" })
                                                            }
                                                        } else {
                                                            if (hora.substring(0, 2) == 17) {
                                                                if (hora.substring(3, 5) < 16) {
                                                                    if (periodo != "Seleccionar Periodo") {
                                                                        console.log("Solicitud enviada");
                                                                        toast.success("SOLICITUD ENVIADA", { position: "top-center" })
                                                                    } else {
                                                                        console.log("Seleccionar Periodo");
                                                                        toast.error("SELECCIONAR PERIODO", { position: "top-center" })
                                                                    }
                                                                } else {
                                                                    console.log("Hora Invalida");
                                                                    toast.error("HORA INVALIDA", { position: "top-center" })
                                                                }
                                                            } else {
                                                                if (periodo != "Seleccionar Periodo") {
                                                                    //principal
                                                                    editarTodo()
                                                                    console.log("Solicitud enviada");
                                                                    toast.success("SOLICITUD ENVIADA", { position: "top-center" })
                                                                } else {
                                                                    console.log("Seleccionar Periodo");
                                                                    toast.error("SELECCIONAR PERIODO", { position: "top-center" })
                                                                }
                                                            }
                                                        }
                                                    } else {
                                                        console.log("Hora no valida");
                                                        toast.error("HORA INVALIDA", { position: "top-center" })
                                                    }
                                                } else {
                                                    console.log("Introducir Hora");
                                                    toast.error("INTRODUCIR HORA", { position: "top-center" })
                                                }
                                            }else{
                                                console.log("Fecha no valida");
                                                toast.error("FECHA INVALIDA", { position: "top-center" })
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
                                    <select class="form-select" ref={refCarrera} required id='CarreraInterfaz'>
                                        <option value = "Ingenieria Sistemas" selected>Ingenieria Sistemas</option>
                                        <option value = "Ingenieria Civil" selected>Ingenieria Civil</option>
                                        <option value = "Ingenieria Industrial" selected>Ingenieria Industrial</option>
                                        <option value = "Seleccionar Carrera" selected>Seleccionar Carrera</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-3 mt-3'>
                                    <h4> Materia :</h4>
                                </div>
                                <div className='col-sm-8 mt-3'>
                                    <select class="form-select" ref={refMateria} required id='MateriaInterfaz'>
                                        <option value = "Taller de ingenieria de software" selected>Taller de ingenieria de software</option>
                                        <option value = "Introduccion a la programacion" selected>Introduccion a la programacion</option>
                                        <option value = "Ingenieria de software" selected>Ingenieria de software</option>
                                        <option value = "Seleccionar Materia" selected>Seleccionar Materia</option>
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
                                        min={1}
                                        max={5}
                                        id = 'grupoInterfaz'
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
                                        min={50}
                                        max={300}
                                        id = 'estudiantesInterfaz'
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-3 mt-3'>
                                    <h4> Motivo :</h4>
                                </div>
                                <div className='col-sm-5 mt-3'>
                                    <select class="form-select" ref={refMotivo} required id = 'motivoInterfaz'>
                                        <option value = "Examen" selected>Examen</option>
                                        <option value = "Laboratorio" selected>Laboratorio</option>
                                        <option value = "Practica" selected>Practica</option>
                                        <option value = "Revision" selected>Revision</option>
                                        <option value = "Seleccionar" selected>Seleccionar Motivo</option>
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
                                        id = "fechaInterfaz"
                                    />
                                </div>
                                <div className='col-sm-4 mt-3'>
                                    <h4> Hora :</h4>
                                    <input type="time"
                                        required
                                        ref={refHora}
                                        class="form-control"
                                        id = "horaInterfaz"
                                    />
                                </div>
                                <div className='col-sm-4 mt-3'>
                                    <h4> Periodo :</h4>
                                    <select class="form-select" ref={refPeriodo} required id='periodoInterfaz'>
                                        <option value = "1 Periodo" selected>1 Periodo</option>
                                        <option value = "2 Periodo" selected>2 Periodo</option>
                                        <option value = "3 Periodo" selected>3 Periodo</option>
                                        <option value = "Seleccionar Periodo" selected>Seleccionar Periodo</option>
                                    </select>
                                </div>
                            </div>
                            <div class="d-grid gap-2 mt-3">
                                <button onClick={EnviarSolicitud} type="button" class="btn btn-info">Enviar Solicitud</button>
                                <Toaster
                                    position="top-center"
                                    reverseOrder={false}
                                /></div>
                        </div>
                    </div>
                </div>
            </div >

        </div >
    )
}