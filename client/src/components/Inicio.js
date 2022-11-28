import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./Pregunta.css"
import papanoel from "./papanoel.png"

function Inicio() {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const [posiciones, setPosiciones] = useState(posRandom());
    const [respuestas, setRespuestas] = useState([]);

    function posRandom() {
        var posiciones = [];
        var num = Math.floor(Math.random() * 4);
        for (let i = 0; i < 4; i++) {
            posiciones.push((num + i) % 4);
        }
        return posiciones;
    }

    useEffect(() => {
        if (questions.length) {
            let res = questions[0].incorrect_answers;
            res.push(questions[0].correct_answer);
            setRespuestas(res);
        }
    }, [questions]);

    useEffect(() => {
        if (respuestas.length && number === 0) {
            setScore(0);
            setUserAnswers([]);
            setNumber(0);
            setLoading(false);
        }
    }, [respuestas]);

    async function empezarJuego() {
        setLoading(true);
        setGameOver(false);
        console.log("cargando")
        await fetch('https://opentdb.com/api.php?amount=10&category=32&type=multiple')
            .then(res => res.json())
            .then(api => {
                setQuestions(api.results);
                setNumber(0);
                console.log(questions)
            })
    };

    function nextQuestion() {
        if (number + 1 === 10) {
            setGameOver(true);
        } else {
            setNumber(number + 1);
            setPosiciones(posRandom());
            let res = questions[number + 1].incorrect_answers;
            res.push(questions[number + 1].correct_answer);
            setRespuestas(res)
        }
    }

    function chekeaYpasa(e) {
        if (e.currentTarget.innerHTML === questions[number].correct_answer) {
            setScore(score + 1);
        }
        nextQuestion();
    }


    return (
        <div id="body-ini">
            {gameOver || userAnswers.length === 10 ? (
                <div id="contenedorini">
                    {/* <img src="https://www.gifsanimados.org/data/media/1083/papa-noel-y-santa-claus-en-navidad-imagen-animada-0502.gif" /> */}
                    <p id="hola">¡HOLA! Nostros somos</p>
                    <div id="nombres"><p>Lydia</p> <p>Davinia</p> <p>Coke</p> </div>
                    <br />
                    <img src="https://www.gifsanimados.org/data/media/1082/reno-de-navidad-imagen-animada-0026.gif" alt="" />
                    <br />
                    <p>¿Te crees capaz de superar nuestro quiz?</p>
                    <Button id="empezar" variant="danger" onClick={empezarJuego}>¡Empezar a jugar!</Button>
                </div>
            ) : null}
            {!gameOver ? <p className="score">Score: {score}</p> : null}
            {loading && <p>Cargando preguntas...</p>}
            {!loading && !gameOver && (
                <div>
                    <img className="papanoel" src={papanoel} />
                    <div className="preguntaContainer">
                        <p className="pregunta" dangerouslySetInnerHTML={{ __html: questions[number].question }}></p>
                        <button dangerouslySetInnerHTML={{ __html: respuestas[posiciones[0]] }} onClick={(e) => chekeaYpasa(e)}></button>
                        <button dangerouslySetInnerHTML={{ __html: respuestas[posiciones[1]] }} onClick={(e) => chekeaYpasa(e)}></button>
                        <button dangerouslySetInnerHTML={{ __html: respuestas[posiciones[2]] }} onClick={(e) => chekeaYpasa(e)}></button>
                        <button dangerouslySetInnerHTML={{ __html: respuestas[posiciones[3]] }} onClick={(e) => chekeaYpasa(e)}></button>
                    </div>
                </div>

            )
            }
        </div>
    );
}

export default Inicio;