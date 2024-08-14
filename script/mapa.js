let map = L.map('mi_mapa').setView([4.7106, -74.1009], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.locate({setView: true, maxZoom: 16});

map.on('locationfound', function(e) {
    var radius = e.accuracy / 22;
    L.marker(e.latlng).addTo(map)

    L.circle(e.latlng, radius).addTo(map);
});


map.on('locationerror', function(e) {

    alert("No se pudo obtener tu ubicación. Recarga la pagina " + e.message);
});

var geocoder = L.Control.Geocoder.nominatim();

document.getElementById('trazar').addEventListener('click', function() {
    var dirorigen = document.getElementById('origen').value;
    var dirdestino = document.getElementById('destino').value;

    //var dirorigen = 'portal 80 bogota' 
    //var dirdestino = 'unicentro de occidente'

    geocoder.geocode(dirorigen, function(results) {
        var origen = results[0].center;
        geocoder.geocode(dirdestino, function(results) {
            var destino = results[0].center;

            L.Routing.control({
                waypoints: [
                    L.latLng(origen.lat, origen.lng),
                    L.latLng(destino.lat, destino.lng)
                ],
                routeWhileDragging: true,
                createMarker: function() { return null; },
                show: false

            }).addTo(map); 
            
            document.querySelectorAll('.leaflet-routing-container').forEach(function(container) {
                container.remove();

            });

            map.fitBounds([
                [origen.lat, origen.lng],
                [destino.lat, destino.lng]
            ]);

            L.marker(origen).addTo(map)
                .bindPopup("Origen: " + dirorigen)
                .openPopup();
            L.marker(destino).addTo(map)
                .bindPopup("Destino: " + dirdestino)
                .openPopup();
        });

        setTimeout(function(){
            window.location.href = "../index.html";
        },10000) 
    });
});
