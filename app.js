const monedaPrimera = document.getElementById('moneda-uno');
const monedaSegunda = document.getElementById('moneda-dos');
const cantidadEl_one = document.getElementById('cantidad-uno');
const cantidadEl_two = document.getElementById('cantidad-dos');
const cambioEl = document.getElementById('cambio');
const tazaEl = document.getElementById('taza');


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

taza.addEventListener('click', () =>{
    const temp = monedaPrimera.value;
    monedaPrimera.value = monedaSegunda.value;
    monedaSegunda.value = temp;
    calculate();
} );


calculate();

