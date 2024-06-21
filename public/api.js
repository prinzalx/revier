// Globale Variable für die Marker-Gruppe, die in map.js definiert sein sollte
// let markers;


function uploadImage(latlng) {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = function(event) {
        let file = event.target.files[0];
        let formData = new FormData();
        formData.append('image', file);
        formData.append('latitude', latlng.lat);
        formData.append('longitude', latlng.lng);
        formData.append('description', prompt("Beschreibung des Bildes:"));

        console.log('Uploading image with data:', {
            file: file.name,
            latitude: latlng.lat,
            longitude: latlng.lng
        });

        fetch('/api/images', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
                });
            }
            return response.json();
        })
        .then(image => {
            console.log('Uploaded image:', image);
            let marker = L.marker([image.latitude, image.longitude], {icon: imageIcon})
                .bindPopup(`<img src="${image.url}" width="100"><br>${image.description}`)
                .on('click', () => showImage(image));
            markers.addLayer(marker);
        })
        .catch(error => {
            console.error('Error uploading image:', error);
            alert('Fehler beim Hochladen des Bildes. Bitte versuchen Sie es erneut.');
        });
    };
    input.click();
}

function addNote(latlng) {
    let note = prompt("Geben Sie Ihre Notiz ein:");
    if (note) {
        let formData = new FormData();
        formData.append('description', note);
        formData.append('latitude', latlng.lat);
        formData.append('longitude', latlng.lng);

        fetch('/api/images', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(image => {
            console.log('Added note:', image);
            if (image.latitude && image.longitude) {
                let marker = L.marker([image.latitude, image.longitude], {icon: noteIcon})
                    .bindPopup(image.description)
                    .on('click', () => showImage(image));
                markers.addLayer(marker);
            } else {
                console.error('Invalid coordinates for added note:', image);
            }
        })
        .catch(error => {
            console.error('Error adding note:', error);
            alert('Fehler beim Hinzufügen der Notiz. Bitte versuchen Sie es erneut.');
        });
    }
}

function addNoteToImage(imageId, form) {
    const note = form.note.value;
    fetch(`/api/images/${imageId}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: note }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(updatedImage => {
        console.log('Added note to image:', updatedImage);
        showImage(updatedImage);
        form.reset();
    })
    .catch(error => {
        console.error('Error adding note to image:', error);
        alert('Fehler beim Hinzufügen der Notiz zum Bild. Bitte versuchen Sie es erneut.');
    });
}

function deleteNote(imageId, noteId) {
    fetch(`/api/images/${imageId}/notes/${noteId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(updatedImage => {
        console.log('Deleted note from image:', updatedImage);
        showImage(updatedImage);
    })
    .catch(error => {
        console.error('Error deleting note:', error);
        alert('Fehler beim Löschen der Notiz. Bitte versuchen Sie es erneut.');
    });
}

function deleteImage(imageId) {
    if (confirm('Sind Sie sicher, dass Sie dieses Bild oder diese Notiz löschen möchten?')) {
        fetch(`/api/images/${imageId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            console.log('Deleted image:', imageId);
            document.getElementById('imageContainer').style.display = 'none';
            markers.clearLayers();
            loadImages();
        })
        .catch(error => {
            console.error('Error deleting image:', error);
            alert('Fehler beim Löschen des Bildes/der Notiz. Bitte versuchen Sie es erneut.');
        });
    }
}

function bulkUpload() {
    let input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = function(event) {
        let files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            let formData = new FormData();
            formData.append('image', files[i]);
            formData.append('latitude', map.getCenter().lat);
            formData.append('longitude', map.getCenter().lng);
            formData.append('description', 'Bulk uploaded image');

            fetch('/api/images', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(image => {
                console.log('Bulk uploaded image:', image);
                if (image.latitude && image.longitude) {
                    let marker = L.marker([image.latitude, image.longitude], {icon: imageIcon})
                        .bindPopup(`<img src="${image.url}" width="100"><br>${image.description}`)
                        .on('click', () => showImage(image));
                    markers.addLayer(marker);
                } else {
                    console.error('Invalid coordinates for bulk uploaded image:', image);
                }
            })
            .catch(error => {
                console.error('Error in bulk upload:', error);
                alert('Fehler beim Massenupload. Bitte versuchen Sie es erneut.');
            });
        }
    };
    input.click();
}

// Diese Funktion sollte in map.js definiert sein, wird aber hier zur Vollständigkeit aufgeführt
function loadImages() {
    fetch('/api/images')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(images => {
            console.log('Loaded images:', images);
            images.forEach(image => {
                if (image.latitude && image.longitude) {
                    let icon = image.url ? imageIcon : noteIcon;
                    let marker = L.marker([image.latitude, image.longitude], {icon: icon})
                        .bindPopup(image.url ? `<img src="${image.url}" width="100"><br>${image.description}` : image.description)
                        .on('click', () => showImage(image));
                    markers.addLayer(marker);
                } else {
                    console.error('Invalid coordinates for image:', image);
                }
            });
            map.addLayer(markers);
        })
        .catch(error => {
            console.error('Error loading images:', error);
            alert('Fehler beim Laden der Bilder und Notizen. Bitte aktualisieren Sie die Seite.');
        });
}
