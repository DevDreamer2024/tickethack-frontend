console.log('Welcome to index.js')


//definir en placeholder dans date.value la date d'aujourd'hui
//mettre en minimum la date d'aujourd'hui 
window.addEventListener('load', () => {
    let currentDate = new Date();
    let dateElement = document.getElementById('date');
    let formattedDate = currentDate.toISOString().split('T')[0];
    dateElement.value = formattedDate
    dateElement.min = formattedDate
    //test a supprimer quand on aura fini
    fetch('http://localhost:3000/trajets/test')
        .then(response => response.json())
        .then(data => console.log(data))
    //fin du test
});
//function recherche

document.querySelector('#searchTicket').addEventListener('click', () => {
    let departure = document.querySelector('#departure').value;
    let arrival = document.querySelector('#arrival').value;
    let date = document.querySelector('#date').value;

    fetch(`http://localhost:3000/trajets/recherche?departure=${departure}&arrival=${arrival}&date=${date}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.result === false) {
                document.querySelector('#content-right').innerHTML = `
                <img src = "images/notfound.png" alt = "not found">
                <div id="horizontal-line"></div>
                <p> No trip found.</p>`	
            } else {
                let content = '';
                data.trajets.forEach(trajets => {
                    const hour = new Date(trajets.date).getHours();
                    const minutes = new Date(trajets.date).getMinutes();
                    const formattedTime = `${hour}:${minutes < 10 ? '0' + minutes : minutes}`;
                    content += `
                    <div class="trajets">
                        <div class="trajets-info">
                            <p>${trajets.departure} > ${trajets.arrival} ${formattedTime} ${trajets.price}€</p>
                        </div>
                        <div class="trajets-reservation">
                            <button class="btn-reservation" id="${trajets.id}" >Book</button>
                        </div>
                    </div>
                    `
                });
                document.querySelector('#content-right').innerHTML = content;

                //et une fois que btn reservation est crée, on lui ajoute un event listener pour ajouter le trajet au panier et rediriger sur cart.html
                document.querySelector('.btn-reservation').addEventListener('click', (event) => {
                    const trajetId = event.target.id;
                    fetch("http://localhost:3000/trajets/ajouteraupanier", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ trajetId })
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            if (data.result === true) {
                                alert('Trip added to cart');
                            } else {
                                alert('Error');
                            }
                        })
                        .catch(error => console.error(error));
                
                        window.location.href = "cart.html"
                    });
            }
        })
        .catch(error => console.error(error));
});