console.log('Welcome to index.js')


//definir en placeholder dans date.value la date d'aujourd'hui
//mettre en minimum la date d'aujourd'hui 
window.addEventListener('load', () => {
    let currentDate = new Date();
    let dateElement = document.getElementById('date');
    let formattedDate = currentDate.toISOString().split('T')[0];
    dateElement.value = formattedDate
    dateElement.min = formattedDate
});


//function recherche

document.querySelector('#searchTicket').addEventListener('click' ,
function () {

let departure = document.querySelector('#departure').value;
let arrival = document.querySelector('#arrival').value;
let date = document.querySelector('#date').value;

fetch ('http://localhost:3000/trajet?departure=${departure}&arrival=${arrival}&date=${date}')
.then(response => response.json())
.then(data => {
    console.log(data);
})
});

