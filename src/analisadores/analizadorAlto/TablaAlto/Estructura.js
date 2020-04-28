class Estructura {
    constructor(nombre, entorno, atributos) {
        this.nombre = nombre;
        this.entorno = entorno;
        this.atributos = atributos;
    }
    getNombre() {
        return this.nombre;
    }
    getEntorno() {
        return this.entorno;
    }
    getAtributos() {
        return this.atributos;
    }
}