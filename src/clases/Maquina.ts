
import Juego,  {Ficha, EstadoJuego} from './Juego';

class Maquina {

    tablero: Ficha[][];


    constructor(tablero: Ficha[][]){
        this.tablero = tablero;
    }


    mostrar(tablero: Ficha[][]): void{
        for (let i = 0; i < 3; i++){
            let f: string = "";

            for(let j = 0; j < 3; j++){
                let anadir: string = tablero[i][j];
                if(anadir === '') f += ' - ';
                else f += ' ' + tablero[i][j] + ' ';
            }
            console.log(f);
        }
    }


    minimax(): number[]{
        let mejorValor = -2;
        let posicionEscogida: number[] = [];

        let tablerosSiguietes: any = [];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              
                if(this.tablero[i][j] === Ficha.vacio){

                    this.tablero[i][j] = Ficha.maquina;

                    

                    let valorCamino = this.minValor(this.tablero, 0);

                    console.log('VALOR CAMINO: ' + valorCamino);
                    this.mostrar(this.tablero);

                    this.tablero[i][j] = Ficha.vacio;
                    
                    if(valorCamino > mejorValor){
                        mejorValor = valorCamino;
                        posicionEscogida = [i, j];
                    }
                }
              
            }
        }
        console.log(tablerosSiguietes);

        return posicionEscogida;
    }


    valorParaEstado(estado: EstadoJuego): number {
        switch(estado){
            case EstadoJuego.empate: return 0;
            case EstadoJuego.ganaMaquina: return 1;
            case EstadoJuego.ganaHumano: return -1;
            default : return 2;
        }
    }


    maxValor(tablero: Ficha[][], profundidad: number): number {
        
        let estadoJuego: EstadoJuego =  Juego.estado(tablero);
        if(estadoJuego !== EstadoJuego.enCurso)
            return  this.valorParaEstado(estadoJuego);

        let valorEscogido = -2;
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (tablero[i][j] === Ficha.vacio) {
                    tablero[i][j] = Ficha.maquina;
                    let valor = this.minValor(tablero, profundidad + 1);
                    tablero[i][j] = Ficha.vacio;
                    valorEscogido = valor > valorEscogido ? valor : valorEscogido;
                }
            }
        }
        return valorEscogido;

    }


    minValor(tablero: Ficha[][], profundidad: number): number{
        let estadoJuego: EstadoJuego =  Juego.estado(tablero);
        if(estadoJuego !== EstadoJuego.enCurso)
            return  this.valorParaEstado(estadoJuego);

        let valorEscogido = 2;
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (tablero[i][j] === Ficha.vacio) {
                    tablero[i][j] = Ficha.humano;
                    let valor = this.maxValor(tablero, profundidad + 1);
                    tablero[i][j] = Ficha.vacio;
                    valorEscogido = valor < valorEscogido ? valor : valorEscogido;
                }
            }
        }

        return valorEscogido;
    }

}

export default Maquina;