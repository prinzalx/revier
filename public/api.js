// API Funktionen für Bilder
async function fetchImages() {
    try {
        const response = await fetch('/api/images');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

async function uploadImage(formData) {
    try {
        const response = await fetch('/api/images', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

async function deleteImage(imageId) {
    try {
        const response = await fetch(`/api/images/${imageId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting image:', error);
    }
}

async function updateImageDescription(imageId, newDescription) {
    try {
        const response = await fetch(`/api/images/${imageId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: newDescription })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating image description:', error);
    }
}

// API Funktionen für Notizen
async function fetchNotes() {
    try {
        const response = await fetch('/api/notes');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching notes:', error);
    }
}

async function addNote(noteData) {
    try {
        const response = await fetch('/api/notes', {
            method: 'POST',
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
        console.error('Error adding note:', error);
    }
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
    }
}

async function deleteNoteAPI(noteId) {
    try {
        const response = await fetch(`/api/notes/${noteId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting note:', error);
    }
}
async function fetchImagesAtLocation(latitude, longitude) {
    try {
        const response = await fetch(`/api/images/location?latitude=${latitude}&longitude=${longitude}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching images at location:', error);
    }
}