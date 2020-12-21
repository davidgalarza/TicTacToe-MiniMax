import { Ficha } from "./Juego";

class Nodo {

    tablero: Ficha[][];
    hijos: Nodo[];

    constructor(tablero: Ficha[][]){
        this.tablero = tablero;
        this.hijos = [];
    }

    anadirHijo(hijo: Nodo){
        this.hijos.push(hijo);
    }

}

export default Nodo;