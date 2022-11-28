import BarraMenu from "./components/BarraMenu"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./components/BarraMenu.css"
import Inicio from "./components/Inicio";
import "./components/Inicio.css"

function App() {
  return (
    <div className="App">
      <BarraMenu></BarraMenu>
      <Inicio></Inicio>
    </div>
  );
}

export default App;
