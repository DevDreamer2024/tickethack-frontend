console.log('Hello from script.js')


//definir en placeholder dans date.value la date d'aujourd'hui
//mettre en minimum la date d'aujourd'hui 
window.addEventListener('load', () => {
    let currentDate = new Date();
    let dateElement = document.getElementById('date');
    let formattedDate = currentDate.toISOString().split('T')[0];
    dateElement.value = formattedDate
    dateElement.min = formattedDate
});



