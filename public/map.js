const startLat = 48.0563055;
const startLng = 15.55363;
const startZoom = 14;

let map = L.map('map').setView([startLat, startLng], startZoom);
console.log('Map initialized');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Definiere markers als globale Variable
window.markers = L.markerClusterGroup();

// Definiere Icons als globale Variablen
window.imageIcon = L.icon({
    iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

window.noteIcon = L.icon({
    iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

let clickedLatLng;

map.on('click', function(e) {
    console.log('Map clicked at:', e.latlng);
    clickedLatLng = e.latlng;
    showAddDialog();
    L.DomEvent.stopPropagation(e);
});

function loadImages() {
    fetch('/api/images')
        .then(response => response.json())
        .then(images => {
            images.forEach(image => {
                let icon = image.url ? window.imageIcon : window.noteIcon;
                let marker = L.marker([image.latitude, image.longitude], {icon: icon})
                    .bindPopup(image.url ? `<img src="${image.url}" width="100"><br>${image.description}` : image.description)
                    .on('click', () => showImage(image));
                window.markers.addLayer(marker);
            });
            map.addLayer(window.markers);
        })
        .catch(error => {
            console.error('Error loading images:', error);
        });
}

loadImages();

let bulkUploadButton = L.control({position: 'topright'});
bulkUploadButton.onAdd = function(map) {
    let div = L.DomUtil.create('div', 'bulk-upload-button');
    div.innerHTML = '<button onclick="bulkUpload()">Massenupload</button>';
    return div;
};
bulkUploadButton.addTo(map);

// Stelle sicher, dass die map global verfügbar ist
window.map = map;
