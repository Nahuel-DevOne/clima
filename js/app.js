// Selectores
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();
    // console.log('buscando el clima');

    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    console.log(ciudad);
    console.log(pais);

    if(ciudad === '' || pais === '') {
        // Hubo un error
        mostrarError('Ambos campos son obligatorios');
        return; // Corta la ejecución del código
    }

    // Consultar la API
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {

    console.log(mensaje);
    const alerta = document.querySelector('.bg-red-100');

    // Validando que no haya un alerta, para no agregar múltiples alertas
    if(!alerta) {
        // Crear una alerta
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        // Quitar la alerta después de 5 segundos
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
}

function consultarAPI(ciudad, pais) {
    const appId = '63b0b596e7a92cc148255480396eb30f'; // la key de la API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    // console.log(url);

    spinner(); // Muestra el spinner de carga

    fetch(url)
        .then( respuesta => respuesta.json() )
        .then( datos => {
            limpiarHTML(); // Elimina el HTML previo

            if(datos.cod === "404") {
                mostrarError('Ciudad no encontrada');
                return;
            }

            // Imprime la respuesta en el HTML
            mostrarClima(datos);
        })
}

function mostrarClima(datos) {
    console.log(datos);

    const { name, main: { temp, temp_max, temp_min } } = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    // Creando y llenando la etiqueta para mostrar el nombre de la ciudad
    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');
    // Creando y llenando la etiqueta para mostrar la temperatura actual
    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`; //usando la entidad html &8451; Se permite con innerHTML, no con textcontent
    actual.classList.add('font-bold', 'text-5xl');
    // Creando y llenando la etiqueta para mostrar la temperatura máxima
    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');
    // Creando y llenando la etiqueta para mostrar la temperatura mínima
    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl');
    // Creando la etiqueta para mostrar los resultados 
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    // Agregando los elementos creados al div resultadoDiv
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
    // Agregando el div resultadoDiv al div resultado para mostrarlo en el html
    resultado.appendChild(resultadoDiv);
}
// Función helper para pasar de Kelvin a Centígrados
const kelvinACentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner(){
    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);
}