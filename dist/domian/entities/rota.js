"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rota = void 0;
class Rota {
    constructor(id, origem, destino) {
        this.id = id;
        this.origem = origem;
        this.destino = destino;
    }
    get distanciaTotal() {
        return this.origem.distanciaAte(this.destino);
    }
    // Getters úteis para acessar os dados
    get getId() {
        return this.id;
    }
    get getOrigem() {
        return this.origem;
    }
    get getDestino() {
        return this.destino;
    }
}
exports.Rota = Rota;
//# sourceMappingURL=rota.js.map