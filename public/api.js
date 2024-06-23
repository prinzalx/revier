async function fetchImages() {
    const response = await fetch('/api/images');
    return await response.json();
}

async function fetchImagesAtLocation(latitude, longitude) {
    const response = await fetch(`/api/images/location?latitude=${latitude}&longitude=${longitude}`);
    return await response.json();
}

async function fetchNotes() {
    const response = await fetch('/api/notes');
    return await response.json();
}

async function deleteImage(imageId) {
    const response = await fetch(`/api/images/${imageId}`, { method: 'DELETE' });
    return await response.json();
}

async function updateImageDescription(imageId, newDescription) {
    const response = await fetch(`/api/images/${imageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: newDescription })
    });
    return await response.json();
}

async function updateNote(noteId, noteData) {
    const response = await fetch(`/api/notes/${noteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
    });
    return await response.json();
}

async function deleteAllData() {
    const response = await fetch('/api/deleteAll', { method: 'DELETE' });
    return await response.json();
}