function saveEditedNote(noteId) {
    const newText = document.getElementById('editNoteText').value;
    
    if (!newText.trim()) {
        alert('Die Notiz darf nicht leer sein.');
        return;
    }

    updateNote(noteId, { text: newText })
        .then(updatedNote => {
            hideDialog('noteDetails');
            reloadAllData();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Fehler beim Aktualisieren der Notiz. Bitte versuchen Sie es erneut.');
        });
}

async function updateNote(noteId, noteData) {
    try {
        const response = await fetch(`/api/notes/${noteId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating note:', error);
        throw error;
    }
}