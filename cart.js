console.log("welcome to cart.js");
//au chargement de la page on regarde si il y a des trajets dans le panier

window.addEventListener('load', () => {
    fetch('http://localhost:3000/trajets/contenudupanier')
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
                    <div class="trajets-departure-arrival"><p>${trajet.departure} > ${trajet.arrival} </div>
                    <div class="trajets-time"><p> ${formattedTime}</p></div>
                    <div class="trajets-price"><p> ${trajet.price}€</p></div>
                    </div>
                    <div class="trajets-reservation">
                        <button class="btn-delete" id="${trajet._id}" >X</button>
                    </div>
                </div>
                `
                total += trajet.price;
            });
            content += `<div class="total"><p>Total: ${total}€</p> 
            <button class ="btn-book">Purchase</button></div>
            <div id="mycart">My cart</div>`;
        
            document.querySelector('#contain').innerHTML = content;
//si le total est a 0 (si on a supprime tout les trajets , reinitialise la div contain)
            if (total == 0) {
                document.querySelector('#contain').innerHTML = `
                <div class="text">
                <p>No tickets in your cart.</p>
            </div>
            <div class ="undertext">
                <p>Why not plan a trip ?</p>
            </div>`
            }
            
            document.querySelectorAll('.btn-delete').forEach(button => {
                button.addEventListener('click', (event) => {
                    const id = event.target.id;
                    fetch(`http://localhost:3000/trajets/enleverdupanier?${id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: id })
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            if (data.result === true) {
                                alert('Trip deleted from cart');
                                window.location.reload();
                            } else {
                                alert('Error');
                            }
                    })
                .catch(error => console.error(error));
            });
         })
         //bouton pour valider la commande faire en sorte que cela modifie tout les elements avec reservationsstatus cart
         document.querySelector('.btn-book').addEventListener('click', () => {
            fetch(`http://localhost:3000/trajets/validerlacommande`) 
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.result === true) {
                        alert('Purchase successful');
                        window.location.href = "bookings.html";
                    } else {
                        alert('Error');
                    }
                })
                .catch(error => console.error(error));
                //fin bouton valider la commande
    })
    //si on ne charge rien
    } else {
        console.log("no trajets in cart")
    } 
    })
    .catch(error => console.error(error));
})

