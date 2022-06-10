import AlertaContext from 'context/alertas/alertaContext';
import React, { useState, useEffect,useContext } from 'react';

export const validationArticles = (formLoginValues) => {

    // const alertaContext = useContext(AlertaContext);
    // const {alerta,mostrarAlerta} = alertaContext;
    let alerta = null;
    let minimos = Number(formLoginValues.minimos);
    let maximos = Number(formLoginValues.maximos);

    // console.log("minimos")
    // console.log(minimos)
    // console.log(typeof minimos);
    // console.log(typeof maximos);

    if(formLoginValues.nombre.trim() === '') {

        alerta = {
            msg: 'El nombre no debe de estar vacio',
            categoria: 'alert alert-danger text-center text-uppercase p3'
        }
        //  mostrarAlerta(alerta.msg,alerta.categoria);

        return alerta;
    }
    // }else{

    if(minimos <= 0) {

        alerta = {
            msg: 'minimo debe ser mayor a 0 y menor a maximo',
            categoria: 'alert alert-danger text-center text-uppercase p3'
        }
        //  mostrarAlerta(alerta.msg,alerta.categoria);

        return alerta;
    }
    // } else{
        if(maximos < minimos) {

            alerta = {
                msg: 'maximo debe ser un entero mayor a minimo',
                categoria: 'alert alert-danger text-center text-uppercase p3'
            }
            //  mostrarAlerta(alerta.msg,alerta.categoria);
    
            return alerta;
        }
        // }else{
        //     return true;
        // }
    // }

    // }

    

    return true;
}