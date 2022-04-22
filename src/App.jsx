import React from "react";
import {Inicio} from './component/Inicio';
import { Registro } from "./component/Registro";
import {Reserva} from "./component/Reserva";
import {
    BrowserRouter as Router,
    Switch, 
    Route
  } from 'react-router-dom';
  import toast, { Toaster } from 'react-hot-toast';

export function App(){
    document.title = "Reserva Aulas"
    return (
        <Router>
            <Switch>
                <Route exact path='/'><Inicio/></Route>
                <Route path = '/registro'><Registro/></Route>
                <Route path = '/reserva'><Reserva/></Route>
            </Switch>
        </Router>
    );
}     