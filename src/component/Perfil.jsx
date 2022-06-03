import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

export function Perfil() {
    const historial = useHistory();
    const titulo = document.title;

    const Atras = () => {
        var esAdmi = true
        if (esAdmi) {
            historial.push('/administrador')
        } else {
            historial.push('/reserva')
        }
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
                        <div className="card-body">
                            <div className='encabezado'>
                                <h4> PERFIL </h4>
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