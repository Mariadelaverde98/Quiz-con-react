import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./Pregunta.css";
import Pregunta from "./Pregunta";
import papanoel from "./papanoel.png"

function Inicio() {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [number, setNumber] = useState(0);
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
            setTimeout(setLoading, 2000, false);
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

    function guardarPartida() {
        let partidas = JSON.parse(localStorage.getItem("partidas"));
        let today = new Date();
        if (partidas) {
            partidas.push([score, today.toLocaleDateString('en-US')]);
            localStorage.setItem("partidas", JSON.stringify(partidas));
        } else {
            localStorage.setItem("partidas", JSON.stringify([[score, today.toLocaleDateString('en-US')]]));
        }
    }

    function nextQuestion() {
        if (number + 1 === 10) {
            guardarPartida();
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
        const resp = document.getElementsByClassName("ans");
        let index;
        for(let i = 0; i < resp.length; i++){
            let res = questions[number].correct_answer;
            if (resp[i].innerText === res || resp[i].innerText === res.substring(0, res.length-1)) {
                index = i;
            }
        }
        resp[index].setAttribute("class", "correcta");
        if (e.currentTarget.innerHTML === questions[number].correct_answer) {
            setScore(score + 1);
        }
        setTimeout(() => {
            document.getElementsByClassName("correcta")[0].setAttribute("class", "ans");
            nextQuestion();
        }, 1000);
        
    }


    return (
        <div id="body-ini">
            {gameOver && number === 0 ? (
                <div id="contenedorini">
                    <p id="hola">¡HOLA! Nostros somos</p>
                    <div id="nombres"><p>Lydia</p> <p>Davinia</p> <p>Coke</p> </div>
                    <br />
                    <img src="https://www.gifsanimados.org/data/media/1082/reno-de-navidad-imagen-animada-0026.gif" alt="" />
                    <br />
                    <p>¿Te crees capaz de superar nuestro quiz?</p>
                    <Button id="empezar" variant="danger" onClick={empezarJuego}>¡Empezar a jugar!</Button>
                </div>
            ) : null}

            {gameOver && number !== 0 ? (
                <div id="final">
                    <img className="papanoel2" src={papanoel} />
                   <p className="score2">Puntuación final: {score}/10</p>
                    <Button id="empezar" variant="danger" onClick={empezarJuego}>¡Volver a jugar!</Button>
                </div>
            ) : null}

            {loading && (
                <div id="cargando">
                    <p>Cargando preguntas...</p>
                    <img src="https://i.pinimg.com/originals/37/9c/95/379c951eca41e6dcc37bb7f376a7a2f4.gif" />
                </div>

            )}

            {!loading && !gameOver && (
                <div>
                    <p className="score">Puntuación: {score} | Pregunta: {number + 1}/10</p>
                    <Pregunta respuestas={respuestas} posiciones={posiciones} pregunta={questions[number].question} funcion={chekeaYpasa}></Pregunta>
                </div>

            )}
        </div>
    );
}

export default Inicio;