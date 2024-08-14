let map = L.map('mi_mapa').setView([4.7106, -74.1009], 15)
 
         L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         }).addTo(map);
 
         L.marker([4.7106, -74.1009]).addTo(map)
         L.marker([4.7138, -74.1051]).addTo(map)
 
        
 
         