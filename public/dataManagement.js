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
    if (confirm('Sind Sie sicher, dass Sie alle Daten loeschen moechten?')) {
        fetch('/api/deleteAll', { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                loadAllData();
                // Kein Dialog zum Hinzufügen nach dem Löschen aller Daten
            })
            .catch(error => console.error('Error deleting all data:', error));
    }
}

document.addEventListener('DOMContentLoaded', loadAllData);