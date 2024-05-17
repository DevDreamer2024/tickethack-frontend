console.log("welcome to booking.js");

window.addEventListener('load', () => {
fetch('http://localhost:3000/trajets/trajetbooked')
    .then(response => response.json())
    .then(data => {
        if (data.trajets.length > 0) {
        console.log(data);
        let content = '';
        let total = 0;
        data.trajets.forEach(trajet => {
            const hour = new Date(trajet.date).getHours();
            const minutes = new Date(trajet.date).getMinutes();
            const formattedTime = `${hour}:${minutes < 10 ? '0' + minutes : minutes}`;
            content += `
            <div class="trajets">
                <div class="trajets-info">
                    <p>${trajet.departure} > ${trajet.arrival} ${formattedTime} ${trajet.price}€</p>
                </div>
            </div>
            `
});
document.querySelector('#contain').innerHTML = content;
}
})
.catch(error => console.error(error));
});
