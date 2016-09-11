import Jugadores from "./jugadores.js";

class Api  {
    constructor () {
        
    }

    jugadores() {
        return Jugadores;
    }

    jugadoresPorPosicion(posicion) {
        return this.jugadores().filter( jugador => jugador.posicion === posicion);
    }
}

export default Api; 