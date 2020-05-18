class Estructura {
    constructor(nombre, entorno, atributos) {
        this.nombre = nombre.toLocaleLowerCase();
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