import Maquina from './Maquina';

export enum Ficha { humano = 'X', maquina = 'O',  vacio = ''};

export enum EstadoJuego {
    ganaHumano = 'X',
    ganaMaquina = 'O',
    empate = 'empate',
    enCurso = 'enCurso'
}


class Juego {

    turno: Ficha;
    tablero: Ficha[][] = [];

    constructor() {
        let aleatorio = Math.random();

        if(aleatorio <= 0.5) this.turno = Ficha.humano;
        else this.turno = Ficha.maquina;
        // this.turno = Ficha.humano;

        for(let i = 0; i < 3; i++){
            let fila = [Ficha.vacio, Ficha.vacio, Ficha.vacio];
            this.tablero.push(fila);
        }

        if(this.turno === Ficha.maquina) {
            let x = Math.floor(Math.random() * 2);
            let y = Math.floor(Math.random() * 2);
            this.tablero[x][y] = Ficha.maquina;
            this.turno = Ficha.humano;
        }
    }


    esTurnoHumano(): boolean {
        return this.turno === Ficha.humano;
    }

    realizarMovimientoMaquina()  {
        console.log('INICIA A PENSAR');
        let maquina = new Maquina(this.tablero);
        let siguienteMovimiento = maquina.minimax();
        if(siguienteMovimiento.length > 0){
            console.log(siguienteMovimiento);
            this.ponerElemento(siguienteMovimiento[0], siguienteMovimiento[1], Ficha.maquina);
            
        }
        console.log('Termina de pensar');
    }

    ponerElemento(x: number, y: number, elemento: Ficha ){
        
        this.tablero[x][y] = elemento;
        this.turno = this.turno === Ficha.humano 
            ? this.turno = Ficha.maquina 
            : this.turno = Ficha.humano;

        if(this.turno === Ficha.maquina) 
        setTimeout(() => {
            this.realizarMovimientoMaquina();
        }, 100)
        
    }


    static estado(tablero: Ficha[][]): EstadoJuego{

        let gana;

        for(let i = 0; i < 3; i++){
            if(tablero[0][i] ===  tablero[1][i] && tablero[1][i] ===  tablero[2][i] && tablero[2][i] !== Ficha.vacio ){
                gana = tablero[0][i];
            }
        }    
        

        for(let i = 0; i < 3; i++){
            if(tablero[i][0] ===  tablero[i][1] && tablero[i][1] ===  tablero[i][2] && tablero[i][2] !== Ficha.vacio){

                gana = tablero[i][0];
            }
        }    


        if(tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2] && tablero[2][2] !== Ficha.vacio){
            gana = tablero[0][0];
        }


        if(tablero[0][2] === tablero[1][1] && tablero[1][1] === tablero[2][0] && tablero[2][0] !== Ficha.vacio){
            gana = tablero[0][2];
        }


        let casillasLlenas = 0;

        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(tablero[i][j] !== Ficha.vacio) casillasLlenas ++;
            }   
        }


        if(gana === Ficha.humano) return EstadoJuego.ganaHumano;
        else if(gana === Ficha.maquina) return EstadoJuego.ganaMaquina;
        else if(casillasLlenas === 9) return EstadoJuego.empate;
        else return EstadoJuego.enCurso;

    }
}

export default Juego;