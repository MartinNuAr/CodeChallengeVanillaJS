let stores = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 19.432249438167513, lng: -99.13116389025723 },
        zoom: 11,
        mapID: 'e63287ff27e920ad',
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
    });

    fetch("../src/json/store_directory_mod.json")
    .then(data => data.json())
    .then(data => data.forEach( store => {
    const marker = new google.maps.Marker({
        position: { 
            lat: parseFloat(store.lat),
            lng: parseFloat(store.lng)
        },
        map,
        title: store.Name,
        icon : {
            url:"../src/img/cart.svg",
            scaledSize: new google.maps.Size(30,24)
        },
        animation: google.maps.Animation.BOUNCE
    });

    const infowindow = new google.maps.InfoWindow({
        content: `
        <strong>${store.Name}</strong>
        <p>${store.Address}</p>
        <button name="btnAgregar">Agregar a favoritos</button>
        `
    });

    marker.addListener("click", ()=> {
        infowindow.open(map, marker);
    });
}))}

window.addEventListener("click", function (event) {
    if (event.target.name === "btnAgregar"){
        document.getElementById("storeTable").classList.remove("d-none");
        document.getElementById("favStores").innerHTML +=
        `<tr>
            <td scope="col">${event.target.parentElement.children[0].innerText}</td>
            <td scope="col">${event.target.parentElement.children[1].innerText}</td>
        </tr>`
    }
})


// 19.432249438167513, -99.13116389025723
// 19.437386977955143, -99.12741983399464