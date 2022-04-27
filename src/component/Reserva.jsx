import React, { useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { Inicio } from './Inicio';

export function Reserva() {
    const historial = useHistory();
    const refNombre = useRef(null);
    const titulo = document.title;

    const CerrarSesion = () => {
        document.title = "Reserva de Aulas"
        historial.push('/')
    }
    return (

        <div className='encabezado'>
            <div className="row">
                <div className="col-sm-4 offset-4 mt-5">
                    <div className="card pt-5">
                        <div className="card-header">
                            <h3>{titulo}</h3>
                        </div>
                        <div className="card-body">
                            <div class="d-grid gap-2 mt-2">
                                <button onClick={CerrarSesion} type="button" class="btn btn-info">Cerrar Sesion</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </div >
        </div>
    )
}/*

*/
