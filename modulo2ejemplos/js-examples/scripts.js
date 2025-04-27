// 1. Función declarativa
function cuadrado(x) {
  return x * x;
}

// Validación de formulario: Valida que los campos no estén vacíos antes de enviar usando JS y DOM.

function mostrarCuadrado() {
  const numeroInput = document.getElementById("numeroCuadrado");
  const numero = numeroInput.value.trim();
  const resultadoDiv = document.getElementById("resultadoCuadrado");

  if (numero === "") {
    resultadoDiv.innerHTML = "Por favor, ingresa un número.";
    return;
  }

  const resultado = cuadrado(parseFloat(numero));
  resultadoDiv.innerHTML = `El cuadrado de ${numero} es ${resultado}`;
}

// 2. Función expresiva
const potencia = function (base, exponente) {
  let resultado = 1;
  for (let i = 0; i < exponente; i++) {
    resultado *= base;
  }
  return resultado;
};

function mostrarPotencia() {
  const baseInput = document.getElementById("base");
  const exponenteInput = document.getElementById("exponente");
  const base = baseInput.value.trim();
  const exponente = exponenteInput.value.trim();
  const resultadoDiv = document.getElementById("resultadoPotencia");

  if (base === "" || exponente === "") {
    resultadoDiv.innerHTML = "Por favor, completa ambos campos.";
    return;
  }

  const resultado = potencia(parseFloat(base), parseFloat(exponente));
  resultadoDiv.innerHTML = `${base} elevado a ${exponente} = ${resultado}`;
}

// 3. Arrow function
const dividir = (a, b) => a / b;

function mostrarDivision() {
  const dividendoInput = document.getElementById("dividendo");
  const divisorInput = document.getElementById("divisor");
  const dividendo = dividendoInput.value.trim();
  const divisor = divisorInput.value.trim();
  const resultadoDiv = document.getElementById("resultadoDivision");

  if (dividendo === "" || divisor === "") {
    resultadoDiv.innerHTML = "Por favor, completa ambos campos.";
    return;
  }

  if (parseFloat(divisor) === 0) {
    resultadoDiv.innerHTML = "El divisor no puede ser cero.";
    return;
  }

  const resultado = dividir(parseFloat(dividendo), parseFloat(divisor));
  resultadoDiv.innerHTML = `${dividendo} ÷ ${divisor} = ${resultado.toFixed(
    2
  )}`;
}

// 4. Función anidada
function humus(factor) {
  const ingrediente = (cantidad, unidad, nombre) => {
    const mensaje = `${cantidad * factor} ${unidad} de ${nombre}<br>`;
    document.getElementById("resultadoHummus").innerHTML += mensaje;
  };

  document.getElementById("resultadoHummus").innerHTML = "";
  ingrediente(1, "lata", "garbanzos");
  ingrediente(0.5, "taza", "tahini");
  ingrediente(2, "cucharadas", "limón");
}

function prepararHummus() {
  humus(2);
}

// 5. Scope
function probarScope() {
  let x = "global";
  let resultado = "";

  function prueba() {
    let x = "local";
    resultado += `Dentro: ${x}<br>`;
  }

  prueba();
  resultado += `Fuera: ${x}`;
  document.getElementById("resultadoScope").innerHTML = resultado;
}

// 6. Factorial (recursividad)
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

function calcularFactorial() {
  const numeroInput = document.getElementById("numeroFactorial");
  const numero = numeroInput.value.trim();
  const resultadoDiv = document.getElementById("resultadoFactorial");

  if (numero === "") {
    resultadoDiv.innerHTML = "Por favor, ingresa un número.";
    return;
  }

  const resultado = factorial(parseInt(numero));
  resultadoDiv.innerHTML = `${numero}! = ${resultado}`;
}

// Función para cambiar secciones
function cambiarSeccion(seccionId) {
  document
    .querySelectorAll(".seccion")
    .forEach((sec) => sec.classList.remove("active"));
  document
    .querySelectorAll(".boton-menu")
    .forEach((btn) => btn.classList.remove("active"));

  document.getElementById(seccionId).classList.add("active");
  event.target.classList.add("active");
}

// Ejemplo 1: Obtener Pokémon básico (Promesas)
// Manejo avanzado de errores: Modifica tu ejemplo de PokeAPI para mostrar un mensaje en un <div class="error">.
function obtenerPokemon() {
  const id = document.getElementById("pokemonId").value;
  const resultadoDiv = document.getElementById("pokemonResult");

  resultadoDiv.innerHTML = "";

  if (isNaN(id) || id < 1 || id > 898) {
    resultadoDiv.innerHTML = "Por favor, ingresa un ID válido entre 1 y 898.";
    return;
  }

  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error");

  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => {
      if (!response.ok) throw new Error("Pokémon no encontrado.");
      return response.json();
    })
    .then((data) => {
      if (!data || !data.name) {
        throw new Error("Datos del Pokémon no encontrados.");
      }

      const html = `
          <h3>${data.name.toUpperCase()}</h3>
          <img src="${data.sprites.front_default}" class="img-pokemon">
          <p>Altura: ${data.height / 10}m | Peso: ${data.weight / 10}kg</p>
          <p>Tipos: ${data.types.map((t) => t.type.name).join(", ")}</p>
        `;
      resultadoDiv.innerHTML = html;
    })
    .catch((error) => {
      errorDiv.innerHTML = `Error: ${error.message}`;
      resultadoDiv.appendChild(errorDiv);
    });
}

// Ejemplo 2: Cadena de evoluciones (Async/Await)
async function obtenerEvoluciones() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/evolution-chain/1");
    const data = await response.json();

    let html = "<h3>Cadena de Evolución de Bulbasaur:</h3>";
    let chain = data.chain;

    while (chain) {
      html += `<p>${chain.species.name} → `;
      chain = chain.evolves_to[0];
    }

    html = html.replace(/→ $/, ""); // Eliminar última flecha
    document.getElementById("evolucionesResult").innerHTML = html;
  } catch (error) {
    document.getElementById(
      "evolucionesResult"
    ).innerHTML = `Error: ${error.message}`;
  }
}

// Ejemplo 3: Pokémon aleatorio (Fetch + Then)
function pokemonAleatorio() {
  const randomId = Math.floor(Math.random() * 898) + 1;

  fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
    .then((response) => response.json())
    .then((pokemon) => {
      const abilities = pokemon.abilities.map((a) => a.ability.name).join(", ");
      document.getElementById("randomPokemon").innerHTML = `
                <h3>${pokemon.name} (#${pokemon.id})</h3>
                <img src="${pokemon.sprites.front_default}" class="img-pokemon">
                <p>Habilidades: ${abilities}</p>
            `;
    });
}

// Ejemplo 4: Pokémon por nombre (Fetch + Async/Await)
async function pokemonPorNombre() {
  const nombreInput = document.getElementById("pokemonNombre");
  const nombre = nombreInput.value.trim().toLowerCase();
  const resultadoDiv = document.getElementById("pokemonNameResult");

  if (nombre === "") {
    resultadoDiv.innerHTML = "Por favor, ingresa un nombre de Pokémon.";
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if (!response.ok) throw new Error("Pokémon no encontrado");

    const pokemon = await response.json();
    const abilities = pokemon.abilities.map((a) => a.ability.name).join(", ");
    resultadoDiv.innerHTML = `
        <h3>${pokemon.name} (#${pokemon.id})</h3>
        <img src="${pokemon.sprites.front_default}" class="img-pokemon">
        <p>Habilidades: ${abilities}</p>
      `;
  } catch (error) {
    resultadoDiv.innerHTML = `Error: ${error.message}`;
  }
}

// Extender las funciones: En js-examples/scripts.js añade una función que calcule el IMC y preséntala con un formulario.
// Función para calcular el IMC
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

// Función para validar y mostrar el IMC
function mostrarIMC() {
  const pesoInput = document.getElementById("peso");
  const alturaInput = document.getElementById("altura");
  const peso = parseFloat(pesoInput.value);
  const altura = parseFloat(alturaInput.value);
  const resultadoDiv = document.getElementById("resultadoIMC");

  // Limpiar mensajes anteriores y estilos
  resultadoDiv.innerHTML = "";
  resultadoDiv.classList.remove("error", "exito");
  pesoInput.classList.remove("input-error");
  alturaInput.classList.remove("input-error");

  // Validaciones
  let errores = false;

  if (pesoInput.value.trim() === "") {
    pesoInput.classList.add("input-error");
    errores = true;
  }

  if (alturaInput.value.trim() === "") {
    alturaInput.classList.add("input-error");
    errores = true;
  }

  if (errores) {
    resultadoDiv.innerHTML = "Por favor, completa todos los campos.";
    resultadoDiv.classList.add("error");
    return;
  }

  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    resultadoDiv.innerHTML =
      "Ingresa valores numéricos válidos y mayores a cero.";
    resultadoDiv.classList.add("error");
    return;
  }

  // Cálculo
  const imc = calcularIMC(peso, altura);
  let clasificacion = "";

  if (imc < 18.5) {
    clasificacion = "Bajo peso";
  } else if (imc < 24.9) {
    clasificacion = "Peso normal";
  } else if (imc < 29.9) {
    clasificacion = "Sobrepeso";
  } else {
    clasificacion = "Obesidad";
  }

  resultadoDiv.innerHTML = `Tu IMC es <strong>${imc.toFixed(
    2
  )}</strong> (${clasificacion}).`;
  resultadoDiv.classList.add("exito");
}

// Nuevo consumo de API: Integra un ejemplo con otra API gratuita (por ejemplo dog.ceo) y muestra la imagen. (https://dog.ceo/dog-api/breeds-list)
async function obtenerPerroAleatorio() {
  const resultadoDiv = document.getElementById("resultadoPerro");

  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();

    if (data.status === "success") {
      const imagen = new Image();
      imagen.src = data.message;

      imagen.onload = function () {
        const width = imagen.width;
        const height = imagen.height;

        resultadoDiv.innerHTML = `
            <h3>Perro Aleatorio:</h3>
            <img src="${data.message}" alt="Perro aleatorio" class="img-perro">
            <p>Dimensiones: ${width} x ${height} píxeles</p>
          `;
      };
    } else {
      resultadoDiv.innerHTML = "No se pudo obtener una imagen de perro.";
    }
  } catch (error) {
    resultadoDiv.innerHTML = `Error: ${error.message}`;
  }
}
