document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveNote').addEventListener('click', function() {
        const text = document.getElementById('noteText').value;
        
        if (!text.trim()) {
            alert('Bitte geben Sie eine Notiz ein.');
            return;
        }

        addNote({
            text: text,
            latitude: clickedLatLng.lat,
            longitude: clickedLatLng.lng
        })
            .then(note => {
                L.marker([note.latitude, note.longitude], {icon: noteIcon})
                    .addTo(map)
                    .on('click', () => showNoteDetails(note));
                hideDialog('noteInput');
                document.getElementById('noteText').value = '';
            })
            .catch(error => console.error('Error:', error));
    });
});