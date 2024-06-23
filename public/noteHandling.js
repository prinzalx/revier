function showNoteDetails(note) {
    document.getElementById('editNoteText').value = note.text;
    document.getElementById('saveEditedNote').onclick = () => saveEditedNote(note._id);
    document.getElementById('deleteNote').onclick = () => deleteNote(note._id);
    showDialog('noteDetails');
}

function saveEditedNote(noteId) {
    const newText = document.getElementById('editNoteText').value;
    
    if (!newText.trim()) {
        alert('Die Notiz darf nicht leer sein.');
        return;
    }

    updateNote(noteId, { text: newText })
        .then(() => {
            hideDialog('noteDetails');
            loadAllData();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Fehler beim Aktualisieren der Notiz. Bitte versuchen Sie es erneut.');
        });
}

function deleteNote(noteId) {
    if (confirm('Sind Sie sicher, dass Sie diese Notiz loeschen moechten?')) {
        fetch(`/api/notes/${noteId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => {
            hideDialog('noteDetails');
            loadAllData();
        })
        .catch(error => console.error('Error:', error));
    }
}

document.getElementById('saveNote').addEventListener('click', function() {
    const text = document.getElementById('noteText').value;
    
    if (!text.trim()) {
        alert('Bitte geben Sie eine Notiz ein.');
        return;
    }

    fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: text,
            latitude: clickedLatLng.lat,
            longitude: clickedLatLng.lng
        }),
    })
    .then(response => response.json())
    .then(note => {
        L.marker([note.latitude, note.longitude], {icon: noteIcon})
            .addTo(map)
            .on('click', () => showNoteDetails(note));
        hideDialog('noteInput');
        document.getElementById('noteText').value = '';
        loadAllData();
    })
    .catch(error => console.error('Error:', error));
});