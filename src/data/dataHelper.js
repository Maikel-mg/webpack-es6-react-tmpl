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

function calculateFilaTotales (data) {
    let newData = [{
        presupuestado : data.map(function (fila) { return fila.presupuestado; }).reduce((a, b) => a + b, 0),
        ingresadoTotal : data.map(function (fila) { return fila.ingresadoTotal; }).reduce((a, b) => a + b, 0),
        ingresadoMediaMensual : data.map(function (fila) { return fila.ingresadoMediaMensual; }).reduce((a, b) => a + b, 0),
        proyeccion : data.map(function (fila) { return fila.proyeccion; }).reduce((a, b) => a + b, 0),
        desviacionIngresadoPresupuestado : data.map(function (fila) { return fila.desviacionIngresadoPresupuestado; }).reduce((a, b) => a + b, 0),
        desviacionProyeccionPresupuestado : data.map(function (fila) { return fila.desviacionProyeccionPresupuestado; }).reduce((a, b) => a + b, 0),
        ingresado : {
            enero : data.map(function (fila) { return fila.ingresado.enero; }).reduce((a, b) => a + b, 0),
            febrero : data.map(function (fila) { return fila.ingresado.febrero; }).reduce((a, b) => a + b, 0),
            marzo : data.map(function (fila) { return fila.ingresado.marzo; }).reduce((a, b) => a + b, 0),
            abril : data.map(function (fila) { return fila.ingresado.abril; }).reduce((a, b) => a + b, 0),
            mayo : data.map(function (fila) { return fila.ingresado.mayo; }).reduce((a, b) => a + b, 0),
            junio : data.map(function (fila) { return fila.ingresado.junio; }).reduce((a, b) => a + b, 0),
            julio : data.map(function (fila) { return fila.ingresado.julio; }).reduce((a, b) => a + b, 0),
            agosto : data.map(function (fila) { return fila.ingresado.agosto; }).reduce((a, b) => a + b, 0),
            septiembre : data.map(function (fila) { return fila.ingresado.septiembre; }).reduce((a, b) => a + b, 0),
            octubre : data.map(function (fila) { return fila.ingresado.octubre; }).reduce((a, b) => a + b, 0),
            noviembre : data.map(function (fila) { return fila.ingresado.noviembre; }).reduce((a, b) => a + b, 0),
            diciembre : data.map(function (fila) { return fila.ingresado.diciembre; }).reduce((a, b) => a + b, 0)
        }
    }];

    return newData;
}

function  getTopClientes (data, top) {
    let newData = JSON.parse(JSON.stringify(data));
    return newData.sort((a,b) => b.ingresadoTotal - a.ingresadoTotal).slice(0, top);
}   

function datosProyeccion (data){
    let totales = calculateFilaTotales(data)[0];

    // let datosPresupuesto = {
    //     enero : totales.presupuestado / 11,
    //     febrero : totales.presupuestado / 11,
    //     marzo : totales.presupuestado / 11,
    //     abril : totales.presupuestado / 11,
    //     mayo : totales.presupuestado / 11,
    //     junio : totales.presupuestado / 11,
    //     julio : totales.presupuestado / 22,
    //     agosto : totales.presupuestado / 22,
    //     septiembre : totales.presupuestado / 11,
    //     octubre : totales.presupuestado / 11,
    //     noviembre : totales.presupuestado / 11,
    //     diciembre : totales.presupuestado / 11
    // };

    // let datosProyecciones = {
    //     enero   : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.enero, 1, 7, 5),
    //     febrero : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.febrero, 2, 7, 5),
    //     marzo   : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.marzo, 3, 7, 5),
    //     abril   : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.abril, 4, 7, 5),
    //     mayo    : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.mayo, 5, 7, 5),
    //     junio   : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.junio, 6, 7, 5),
    //     julio   : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.julio, 7, 7, 5),
    //     agosto  : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.agosto, 8, 7, 5),
    //     septiembre  : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.septiembre, 9, 7, 5),
    //     octubre     : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.octubre, 10, 7, 5),
    //     noviembre   : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.noviembre, 11, 7, 5),
    //     diciembre   : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.diciembre, 12, 7, 5)
    // }

    let datosComparativa =[
        {
            mes : "Enero",
            presupuesto : totales.presupuestado / 11,
            proyeccion : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.enero, 1, 7, 5) 
        },
        {
            mes : "Febrero",
            presupuesto : totales.presupuestado / 11,
            proyeccion : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.febrero, 2, 7, 5) 
        },
        {
            mes : "Marzo",
            presupuesto : totales.presupuestado / 11,
            proyeccion : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.marzo, 3, 7, 5) 
        },
        {
            mes : "Abril",
            presupuesto : totales.presupuestado / 11,
            proyeccion : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.abril, 4, 7, 5) 
        },
        {
            mes : "Mayo",
            presupuesto : totales.presupuestado / 11,
            proyeccion : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.mayo, 5, 7, 5) 
        },
        {
            mes : "Junio",
            presupuesto : totales.presupuestado / 11,
            proyeccion : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.junio, 6, 7, 5) 
        },
        {
            mes : "Julio",
            presupuesto : totales.presupuestado / 22,
            proyeccion : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.julio, 7, 7, 5) 
        },
        {
            mes : "Agosto",
            presupuesto : totales.presupuestado / 22,
            proyeccion : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.agosto, 8, 7, 5) 
        },
        {
            mes : "Septiembre",
            presupuesto : totales.presupuestado / 11,
            proyeccion : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.septiembre, 9, 7, 5) 
        },
        {
            mes : "Octubre",
            presupuesto : totales.presupuestado / 11,
            proyeccion : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.octubre, 10, 7, 5) 
        },
        {
            mes : "Noviembre",
            presupuesto : totales.presupuestado / 11,
            proyeccion : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.noviembre, 11, 7, 5) 
        },
        {
            mes : "Diciembre",
            presupuesto : totales.presupuestado / 11,
            proyeccion : calculateTotalProyeccion(totales.proyeccion, totales.ingresadoTotal, totales.ingresado.diciembre, 12, 7, 5) 
        }
    ];

    return datosComparativa;
}

function calculateTotalProyeccion (sumaHorasProyectadas, totalIngresado, totalIngresadoMes, numeroMes, mesesConResultado, mesesAProyectar){

    if(numeroMes <= mesesConResultado) {
        return totalIngresadoMes;
    }


    if (mesesConResultado<=6 ) {
        if (numeroMes == 7 || numeroMes == 8) {
            return  (sumaHorasProyectadas - totalIngresado) / ( (mesesAProyectar-1) / 2 ); 
        } else {
            return  (sumaHorasProyectadas - totalIngresado) / ( (mesesAProyectar-1));
        }
    } else {
        if (numeroMes >= 9) {
            return  (sumaHorasProyectadas - totalIngresado) / ( (mesesAProyectar-1));
        } else {
            if (numeroMes == 7 || numeroMes == 8) {
                return  (sumaHorasProyectadas - totalIngresado) / ( (mesesAProyectar) * 2 ); 
            } else {
                return  ( (sumaHorasProyectadas - totalIngresado) - ( (sumaHorasProyectadas - totalIngresado) / ( mesesAProyectar * 2) ) ) / (mesesAProyectar -1)  ;
            }
        }
    }
}

export default {
    procesarDatos,
    getTopClientes,
    calculateFilaTotales,
    datosProyeccion
};