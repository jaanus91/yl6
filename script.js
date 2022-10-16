(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            let date = new Date();
            c.innerHTML = date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });

        }

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";


    function estimateDelivery(event) {
        event.preventDefault();

        let kasSisaldabNrit = /\d/;
        let linn = document.getElementById("linn");
        let eesnimi = document.getElementById("fname");
        let perenimi = document.getElementById("lname");
        let valitudMaksemeetod = document.querySelector('input[name="maksemeetod"]:checked');

        if (eesnimi.value.trim() === "" || kasSisaldabNrit.test(eesnimi.value)) {
            alert("Eesnimi ei tohi olla tühi või sisaldada numbrit");
            eesnimi.focus();
            return;

        } else if (perenimi.value.trim() === "" || kasSisaldabNrit.test(perenimi.value)) {
            alert("Perenimi ei tohi olla tühi või sisaldada numbrit");
            perenimi.focus();
            return;

        } else if (linn.value.trim() === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;

        } else if (valitudMaksemeetod === null) {
            alert("Vali maksemeetod");
            return;

        } else {
            let kasKingitus = document.getElementById("v1").checked ? 5 : 0;
            let kasKontaktiVaba = document.getElementById("v2").checked ? 1 : 0
            let linnHind = linn.value
            let tarne =
                parseFloat(kasKingitus) +
                parseFloat(kasKontaktiVaba) +
                parseFloat(linnHind) +
                parseFloat(valitudMaksemeetod.value);

            e.innerHTML = tarne + " &euro;";

        }

        console.log("Tarne hind on arvutatud");
    }

})();

// map

let mapAPIKey = "Avslzl9rVgdKngc0zXAyS_1TvZCSS12q9aMqUv_CUdiD0YqcOGXqrEpRAuKj2WXi";

let map, infobox;

function GetMap() {

    "use strict";

    let point1 = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );

    let point2 = new Microsoft.Maps.Location(
        59.438511,
        24.771454
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        // center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    infobox.setMap(map);


    let pin1 = new Microsoft.Maps.Pushpin(point1)
    pin1.metadata = {
        title: 'Tartu Ülikool',
        description: 'Siin asub tore ülikool'
    };

    let pin2 = new Microsoft.Maps.Pushpin(point2)
    pin2.metadata = {
        title: 'Tallinna Ülikool',
        description: 'Siin asub teine tore ülikool'
    };

    Microsoft.Maps.Events.addHandler(pin1, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pin2, 'click', pushpinClicked);

    map.entities.push(pin1);
    map.entities.push(pin2);

}

function pushpinClicked(e) {
    if (e.target.metadata) {
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}


// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

