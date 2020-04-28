class Ast {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.asignarIndice();
    }
    asignarIndice() {
        let i = 0;
        this.instrucciones.map(m => {
            m.index = i++;
        });
    }
}
exports.Ast = Ast;
