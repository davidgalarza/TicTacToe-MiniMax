import Juego, { EstadoJuego, Ficha } from './clases/Juego';
import TableroUI from './componentes/TableroUI';
import React, { useState } from 'react';
import './App.css';


let juego = new Juego();

function App() {

  const [tablero, setTablero] = useState(juego.tablero);

  const [turno, setTurno] = useState(juego.turno);

  const [ganador, setGanador] = useState<EstadoJuego>(EstadoJuego.enCurso);



  const clickTablero = (x: number, y : number) => {
    juego.ponerElemento(x, y, Ficha.humano);
    setTablero(juego.tablero);
    setTurno(juego.turno);
    setTimeout(() =>{
      setTablero(juego.tablero);
      setTurno(juego.turno);
      let estado = Juego.estado(juego.tablero);
      if(estado !== EstadoJuego.enCurso){
        setGanador(estado);
      }    
    }, 1000);
  }

  return (
    <div className="App">
      <h2>Tres en calle</h2>
      <h4>Turno: {turno}</h4>

    {
      ganador !== EstadoJuego.enCurso 
        ?
        ganador === EstadoJuego.empate 
          ? <h1>EMPATE</h1> 
          : <h1>GANA {ganador}</h1> 
        : 
      <span></span>
    }
      <TableroUI 
        habilitado={turno === Ficha.humano} 
        enClick={clickTablero} 
        tablero={tablero}/>
    </div>
  );
}

export default App;
