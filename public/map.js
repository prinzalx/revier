let map, imageIcon, noteIcon, clickedLatLng;

function initMap() {
    map = L.map('map').setView([48.0563055, 15.55363], 16);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);

    imageIcon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    noteIcon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    map.on('click', function(e) {
        clickedLatLng = e.latlng;
        showActionModal();
    });

    loadAllData();
    loadGPXTrack();
}

function loadAllData() {
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    fetchImages().then(images => {
        images.forEach(image => {
            L.marker([image.latitude, image.longitude], {icon: imageIcon})
                .addTo(map)
                .on('click', () => showImageDetails(image));
        });
    });

    fetchNotes().then(notes => {
        notes.forEach(note => {
            L.marker([note.latitude, note.longitude], {icon: noteIcon})
                .addTo(map)
                .on('click', () => showNoteDetails(note));
        });
    });
}

function loadGPXTrack() {
    new L.GPX("20240622130947-33121-data.gpx", {
        async: true,
        marker_options: {
            startIconUrl: '',
            endIconUrl: '',
            shadowUrl: ''
        }
    }).on('loaded', function(e) {
        map.fitBounds(e.target.getBounds());
    }).addTo(map);
}

function addMarker(lat, lng, isImage = true) {
    const icon = isImage ? imageIcon : noteIcon;
    return L.marker([lat, lng], {icon: icon}).addTo(map);
}

function removeMarker(marker) {
    map.removeLayer(marker);
}

function centerMap(lat, lng, zoom = 16) {
    map.setView([lat, lng], zoom);
}

function getMapBounds() {
    return map.getBounds();
}

function addPolygon(coordinates, options = {}) {
    return L.polygon(coordinates, options).addTo(map);
}

function removePolygon(polygon) {
    map.removeLayer(polygon);
}

function clearMap() {
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker || layer instanceof L.Polygon) {
            map.removeLayer(layer);
        }
    });
}

document.addEventListener('DOMContentLoaded', initMap);