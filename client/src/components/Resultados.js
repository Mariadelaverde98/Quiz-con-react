import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./Resultados.css"

function Resultados(props) {
    const [partidas, setPartidas] = useState(JSON.parse(localStorage.getItem("partidas")));
    return (
        <div id="body-ini" className="resul">
            <Table striped bordered hover id="resultado">
                <thead>
                    <tr>
                        <th></th>
                        <th>Fecha</th>
                        <th>Puntuación</th>
                    </tr>
                </thead>
                <tbody>
                    {partidas ? partidas.map((partida, i) => {
                        return (
                            <tr>
                                <td>{i+1}</td>
                                <td>{partida[1]}</td>
                                <td>{partida[0]}</td>
                            </tr>
                        )
                    }) : null}
                </tbody>
            </Table>
        </div>
    );
}

export default Resultados;