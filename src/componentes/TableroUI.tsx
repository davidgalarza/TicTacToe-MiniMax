import {Ficha} from '../clases/Juego';
import './tablero.css';

interface TableroProps {
    tablero: string[][];
    enClick: Function;
    habilitado: boolean;
}

function TableroUI({tablero, enClick, habilitado}: TableroProps) {
    return (
        <div>
            {
                tablero.map((fila, i) =>{
                    return (
                        <div key={`f${i}`}>
                            {
                                fila.map((v, j) =>  
                                    <div 
                                        onClick={ () => habilitado && v === Ficha.vacio ?  enClick(i, j) :  null } 
                                        key={`v${j}`} className="casilla">
                                            <span>{v === 'X' ? '✘' :
                                            v === 'O'? '○': ''}</span>
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
        
    )
}
  
export default TableroUI;