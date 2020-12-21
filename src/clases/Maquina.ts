
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

    // Ejecuta el algortimo MINIMAX y devuelve las coordenadas escogidas
    minimax(): number[] {
        let mejorValor = -2; 
        let posicionEscogida: number[] = [];

        // Recorrer el tablero actual
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Si la posicion esta vacia prueba ese movimiento
                if(this.tablero[i][j] === Ficha.vacio){

                    this.tablero[i][j] = Ficha.maquina; // Poner ficha
                    // Valor del camino (devuelve el min)
                    let valorCamino = this.minValor(this.tablero, 0);

                    console.log('VALOR CAMINO: ' + valorCamino);
                    this.mostrar(this.tablero);


                    // Resetear tablero
                    this.tablero[i][j] = Ficha.vacio; 
                    

                    // verificar si el camino es mejor
                    if(valorCamino > mejorValor){
                        // Escoge ccomo mejor camino
                        mejorValor = valorCamino;
                        posicionEscogida = [i, j];
                    }
                }
              
            }
        }


        // Retorna las coordenadas que escoge
        return posicionEscogida;
    }

    // Retorna el valor del estado correspondiente
    valorParaEstado(estado: EstadoJuego): number {
        switch(estado){
            case EstadoJuego.empate: return 0;
            case EstadoJuego.ganaMaquina: return 1;
            case EstadoJuego.ganaHumano: return -1;
            default : return 2;
        }
    }

    // Busca el movimiento siguiente de MAYOR valor y devuelve
    maxValor(tablero: Ficha[][], profundidad: number): number {
        // Verificar si el juego termino
        let estadoJuego: EstadoJuego =  Juego.estado(tablero);
        if(estadoJuego !== EstadoJuego.enCurso) {
            // Retorna el valor correspodiente al escenario
            return  this.valorParaEstado(estadoJuego);
        }
            

        let valorEscogido = -2; // Inicia valor minimo

        // Recorre el tablero pasado
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Verifica si esta vacio (pruba el movimiento)
                if (tablero[i][j] === Ficha.vacio) {
                    // Poner la ficha de la maquina
                    tablero[i][j] = Ficha.maquina;
                    // Obtner el valor devulto por MIN
                    let valor = this.minValor(tablero, profundidad + 1);
                    tablero[i][j] = Ficha.vacio; // Resetea el tablero
                    // Verifica si el valor moviento es mejor (MAYOR) al actual
                    valorEscogido = valor > valorEscogido ? valor : valorEscogido;
                }
            }
        }
        return valorEscogido;

    }

    // Busca el movimiento siguiente de MENOR valor y devuelve
    minValor(tablero: Ficha[][], profundidad: number): number{
        // Verificar si el juego termino
        let estadoJuego: EstadoJuego =  Juego.estado(tablero);
        if(estadoJuego !== EstadoJuego.enCurso){
            // Retorna el valor correspodiente al escenario
            return  this.valorParaEstado(estadoJuego);
        }
            

        let valorEscogido = 2; // Inicia en un valor maximo
        
        // Recorre el tablero pasado
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Verifica si esta vacio (pruba el movimiento)
                if (tablero[i][j] === Ficha.vacio) {
                    // Poner la ficha del humano
                    tablero[i][j] = Ficha.humano;
                    // Obtner el valor devulto por MAX
                    let valor = this.maxValor(tablero, profundidad + 1);
                    tablero[i][j] = Ficha.vacio; // Reinici el tablero
                    // Verifica si el valor moviento es mejor (MENOR) al actual
                    valorEscogido = valor < valorEscogido ? valor : valorEscogido;
                }
            }
        }

        // Retorna el valor minimo escogido

        return valorEscogido;
    }

}

export default Maquina;