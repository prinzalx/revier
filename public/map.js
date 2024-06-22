let map, imageIcon, noteIcon, clickedLatLng;

document.addEventListener('DOMContentLoaded', function() {
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

    loadAllData();

    map.on('click', function(e) {
        clickedLatLng = e.latlng;
        showActionModal(e.latlng);
    });

    L.Control.DeleteAllButton = L.Control.extend({
        onAdd: function(map) {
            var button = L.DomUtil.create('button', 'delete-all-button');
            button.innerHTML = 'Alle Daten loeschen';
            button.style.backgroundColor = 'red';
            button.style.color = 'white';
            button.style.padding = '10px';
            button.style.border = 'none';
            button.style.cursor = 'pointer';
            
            L.DomEvent.on(button, 'click', function() {
                if (confirm('Sind Sie sicher, dass Sie alle Daten loeschen moechten?')) {
                    deleteAllData();
                }
            });
            
            return button;
        },
        onRemove: function(map) {}
    });

    L.control.deleteAllButton = function(opts) {
        return new L.Control.DeleteAllButton(opts);
    }

    L.control.deleteAllButton({ position: 'topright' }).addTo(map);
});

function showImageDetails(image) {
    fetchImagesAtLocation(image.latitude, image.longitude)
        .then(images => {
            updateImageCarousel(images);
            showDialog('imageDetails');
        });
}

function updateImageCarousel(images) {
    const carousel = document.getElementById('imageCarousel');
    carousel.innerHTML = '';
    images.forEach(img => {
        const imgElement = document.createElement('div');
        imgElement.innerHTML = `
            <p>${img.description}</p>
            <img src="${img.url}" alt="${img.description}">
        `;
        imgElement.dataset.imageId = img._id;
        carousel.appendChild(imgElement);
    });
    if ($('#imageCarousel').hasClass('slick-initialized')) {
        $('#imageCarousel').slick('unslick');
    }
    $('#imageCarousel').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });
}

function showNoteDetails(note) {
    document.getElementById('editNoteText').value = note.text;
    document.getElementById('saveEditedNote').onclick = () => saveEditedNote(note._id);
    document.getElementById('deleteNote').onclick = () => deleteNote(note._id);
    showDialog('noteDetails');
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

function deleteAllData() {
    fetch('/api/deleteAll', { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            loadAllData();
        })
        .catch(error => console.error('Error deleting all data:', error));
}