import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./Pregunta.css"
import papanoel from "./papanoel.png"

function Pregunta(props) {

    return (
        <div>
            <img className="papanoel" src={papanoel} />
            <div className="preguntaContainer">
                <p className="pregunta" dangerouslySetInnerHTML={{__html: props.pregunta}}></p>
                <button className="ans" dangerouslySetInnerHTML={{ __html: props.respuestas[props.posiciones[0]] }} onClick={(e) => props.funcion(e)}></button>
                <button className="ans" dangerouslySetInnerHTML={{ __html: props.respuestas[props.posiciones[1]] }} onClick={(e) => props.funcion(e)}></button>
                <button className="ans" dangerouslySetInnerHTML={{ __html: props.respuestas[props.posiciones[2]] }} onClick={(e) => props.funcion(e)}></button>
                <button className="ans" dangerouslySetInnerHTML={{ __html: props.respuestas[props.posiciones[3]] }} onClick={(e) => props.funcion(e)}></button>
            </div>
        </div>
    );
}

export default Pregunta;