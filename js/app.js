//variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//contenedor del div de resultados
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 10;


const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',
    puertas : '',
    transmision : '',
    color : ''
}


//Eventos
document.addEventListener('DOMContentLoaded', ()=>{
mostrarAutos(autos);//Muestra los datos de los autos en el div de resultados
llenarSelect();
});

marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;

    filtrar();
});

year.addEventListener('change', e =>{
    datosBusqueda.year = parseInt( e.target.value );
    
    filtrar();
});

minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = e.target.value;

    filtrar();
});

maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = e.target.value;

    filtrar();
});

puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = parseInt( e.target.value );

    filtrar();
});

transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;

    filtrar();
});

color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;

    filtrar();
});

//Funciones
function mostrarAutos(autos){
    limpiarHTML();//limpia todos los autos 

    autos.forEach(auto =>{
        const autosHtml = document.createElement('p');

        autosHtml.textContent = `
            ${auto.marca} - Modelo: ${auto.modelo} - Año: ${auto.year} - Precio: ${auto.precio} - ${auto.puertas} Puertas - Color ${auto.color} - Transmicion: ${auto.transmision}
        `
        resultado.appendChild(autosHtml);
    })
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect(){
    for(let i= max; i>=min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;

        year.appendChild(opcion);
    }
}

function filtrar(){
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( valorMinimo ).filter( valorMaximo ).filter( cantidadPuertas ).filter ( filtrarTransmision ).filter( filtrarColor );

    //console.log(resultado);

    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
}

function noResultado(){
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta','error');
    noResultado.textContent = 'No hay resultados para su busqueda, intente con otras opciones';

    resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
}

function filtrarYear(auto){
    if(datosBusqueda.year){
        return auto.year === datosBusqueda.year;
    }
    return auto;
}

function valorMinimo(auto){
    if(datosBusqueda.minimo){
        return auto.precio >= datosBusqueda.minimo;
    }
    return auto;
}

function valorMaximo(auto){
    if(datosBusqueda.maximo){
        return auto.precio <= datosBusqueda.maximo;
    }
    return auto;
}

function cantidadPuertas(auto){
    if(datosBusqueda.puertas){
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}

function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    }
    return auto;
}