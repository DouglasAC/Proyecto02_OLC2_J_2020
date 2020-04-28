class Atributo {
    constructor(tipo, nombre, valor) {
        this.tipo = tipo;
        this.nombre = nombre.toLocaleLowerCase();
        this.valor = valor;
    }
    getTipo() {
        return this.tipo;
    }
    getNombre() {
        return this.nombre;
    }
    getValor() {
        return this.valor;
    }
}