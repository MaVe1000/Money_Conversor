const monedaPrimera = document.getElementById('moneda-uno');
const monedaSegunda = document.getElementById('moneda-dos');
const cantidadEl_one = document.getElementById('cantidad-uno');
const cantidadEl_two = document.getElementById('cantidad-dos');
const cambioEl = document.getElementById('cambio');
const tazaEl = document.getElementById('taza');

//Se define un arreglo con las monedas soportadas por el sistema
const modedas = ["AED", "ARS","AUD","BGN","BRL","BSD","CAD","CHF","CLP","CNY","COP",
    "CZK","DKK","DOP","EGP","EUR","FJD","GBP","GTQ","HKD","HRK","HUF","IDR","ILS","INR",
    "ISK","JPY","KRW","KZT","MXN","MYR","NOK","NZD","PAB","PEN","PHP","PKR","PLN","PYG",
    "RON","RUB","SAR","SEK","SGD","THB","TRY","TWD","UAH","USD","UYU","VND","ZAR"]


// Fetch Exchange Rate and Update the DOM
function calculate(){
    const moneda_one = monedaPrimera.value;
    const moneda_two = monedaSegunda.value;

   fetch(`https://api.exchangerate-api.com/v4/latest/${moneda_one}`)
   .then(res => res.json() )
   .then(data => {
       const taza = data.rates[moneda_two];
       
       cambioEl.innerText = `1 ${moneda_one} = ${taza} ${moneda_two}`;

       cantidadEl_two.value = (cantidadEl_one.value * taza).toFixed(2);

    } );
    
}

//Event listeners
monedaPrimera.addEventListener('change', calculate);
cantidadEl_one.addEventListener('input', calculate);
monedaSegunda.addEventListener('change', calculate);
cantidadEl_two.addEventListener('input', calculate);

tazaEl.addEventListener('click', () =>{
    const temp = monedaPrimera.value;
    monedaPrimera.value = monedaSegunda.value;
    monedaSegunda.value = temp;
    calculate();
} );

calculate();

/*
Agregada función para colocar las distintas monedas en los select
@agregarOpcionesSelect(html.select, array, str)
*/
function agregarOpcionesSelect(idSelect, monedas, valorSeleccionar) {
    const selectElement = document.getElementById(idSelect);
    selectElement.innerHTML = ''; 

    monedas.forEach(moneda => {
        const optionElement = document.createElement('option');
        optionElement.value = moneda;
        optionElement.text = moneda;
        if (moneda === valorSeleccionar) {
            optionElement.selected = true;
        }
        selectElement.appendChild(optionElement);
    });
}

agregarOpcionesSelect('moneda-uno', modedas, 'USD');
agregarOpcionesSelect('moneda-dos', modedas, 'EUR');
