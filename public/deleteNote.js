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