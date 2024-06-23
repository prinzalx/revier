let map, imageIcon, noteIcon, clickedLatLng, locationMarker;

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

    addLocationButton();
    loadAllData();
    loadGPXTrack();
}

function addLocationButton() {
    L.Control.LocationButton = L.Control.extend({
        onAdd: function(map) {
            var button = L.DomUtil.create('button', 'location-button');
            button.innerHTML = '??';
            button.style.fontSize = '20px';
            button.style.backgroundColor = 'white';
            button.style.width = '30px';
            button.style.height = '30px';
            button.style.border = 'none';
            button.style.borderRadius = '4px';
            button.style.cursor = 'pointer';
            
            L.DomEvent.on(button, 'click', requestLocation);
            
            return button;
        },
        onRemove: function(map) {}
    });

    L.control.locationButton = function(opts) {
        return new L.Control.LocationButton(opts);
    }

    L.control.locationButton({ position: 'topright' }).addTo(map);
}

function requestLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            if (locationMarker) {
                map.removeLayer(locationMarker);
            }
            locationMarker = L.marker([lat, lon]).addTo(map);
            map.setView([lat, lon], 16);
        }, function(error) {
            console.error("Error: " + error.message);
            alert("Konnte Standort nicht abrufen. Bitte überprüfen Sie Ihre Standorteinstellungen.");
        });
    } else {
        alert("Geolocation wird von Ihrem Browser nicht unterstützt.");
    }
}

function loadAllData() {
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

document.addEventListener('DOMContentLoaded', initMap);