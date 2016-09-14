import dataResumenMensual from "./resumenMensual.js";

function procesarDatos (mesesConResultado, mesesAProyectar) {
    let nuevosDatos = [];

    dataResumenMensual.forEach(function(element) {
        nuevosDatos.push( addCalculos(element, mesesConResultado, mesesAProyectar) );
    }, this);

    return nuevosDatos;
}

function addCalculos (row, mesesConResultado, mesesAProyectar) {
    let newRow = {};

    newRow.ingresadoTotal = calculateIngresado(row);
    newRow.ingresadoMediaMensual = calculateIngresadoMediaMensual(row, mesesConResultado);
    newRow.proyeccion = calculateProyeccion(row, mesesConResultado, mesesAProyectar);
    newRow.desviacionIngresadoPresupuestado = calculateDesviacionIngresoPresupuesto(row, mesesConResultado, mesesAProyectar);
    newRow.desviacionProyeccionPresupuestado = calculateDesviacionProyectadoPresupuesto(row, mesesConResultado, mesesAProyectar);
    
    return Object.assign(newRow, row);
}

function calculateIngresado (row) {
    let arrayMeses = Object.keys(row.ingresado).map((k) => row.ingresado[k]);
    let sumaIngresado =  arrayMeses.reduce((a, b) => a + b, 0);

    return sumaIngresado;
}

function  calculateIngresadoMediaMensual (row, mesesConResultado) {
    let sumaIngresado =  calculateIngresado(row);

    return (sumaIngresado === 0) ? 0 : sumaIngresado / mesesConResultado;
}

function calculateProyeccion (row, mesesConResultado, mesesAProyectar) {
    let sumaIngresado =  calculateIngresado(row);

    if (mesesConResultado <= 6) {
        return sumaIngresado + (sumaIngresado / mesesConResultado) * ( mesesAProyectar - 1)
    } else if (mesesConResultado === 7) { 
        return sumaIngresado + (sumaIngresado / 6.5) * ( mesesAProyectar - 0.5) // en base 12
    } else if (mesesConResultado > 7) { 
        return sumaIngresado + (sumaIngresado / 7) * ( mesesAProyectar)
    } 
}

function calculateDesviacionProyectadoPresupuesto (row, mesesConResultado, mesesAProyectar) {
    return calculateProyeccion(row, mesesConResultado, mesesAProyectar) - row.presupuestado;
}

function calculateDesviacionIngresoPresupuesto (row, mesesConResultado, mesesAProyectar) {
    return calculateIngresado(row, mesesConResultado, mesesAProyectar) - row.presupuestado
}

function  getTopClientes (data, top) {
    let newData = JSON.parse(JSON.stringify(data));
    return newData.sort((a,b) => b.ingresadoTotal - a.ingresadoTotal).slice(0, top);
}   

export default {
    procesarDatos,
    getTopClientes
};