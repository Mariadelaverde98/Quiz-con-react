import BarraMenu from "./components/BarraMenu"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./components/BarraMenu.css"
import Inicio from "./components/Inicio";
import "./components/Inicio.css"
import Resultados from "./components/Resultados";
import { useState } from "react";

function App() {
  const [vistaIni, setVistaIni] = useState(true)
  return (
    <div className="App">
      <BarraMenu vista={setVistaIni}></BarraMenu>
      {vistaIni ? <Inicio/> : <Resultados/>}
    </div>
  );
}

export default App;
