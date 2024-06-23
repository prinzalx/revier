let currentImages = [];
let currentImageIndex = 0;

function showImageDetails(image) {
    fetchImagesAtLocation(image.latitude, image.longitude)
        .then(images => {
            currentImages = images;
            currentImageIndex = images.findIndex(img => img._id === image._id);
            updateImageView();
            showDialog('imageDetails');
        });
}

function updateImageView() {
    const image = currentImages[currentImageIndex];
    const container = document.getElementById('imageCarousel');
    const date = new Date(image.createdAt);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear().toString().substr(-2)}`;
    
    container.innerHTML = `
        <p>${formattedDate}</p>
        <p>${image.description}</p>
        <img src="${image.url}" alt="${image.description}" onclick="toggleFullscreen(this)">
    `;
    
    if (currentImages.length > 1) {
        container.innerHTML += `
            <div>
                <button onclick="prevImage()">Vorheriges</button>
                <button onclick="nextImage()">Naechstes</button>
            </div>
        `;
    }
}

function toggleFullscreen(img) {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        const fullscreenDiv = document.createElement('div');
        fullscreenDiv.className = 'fullscreen-image';
        const fullImg = document.createElement('img');
        fullImg.src = img.src;
        fullImg.alt = img.alt;
        fullImg.onclick = () => document.exitFullscreen();
        fullscreenDiv.appendChild(fullImg);
        fullscreenDiv.requestFullscreen();
    }
}

function prevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateImageView();
    }
}

function nextImage() {
    if (currentImageIndex < currentImages.length - 1) {
        currentImageIndex++;
        updateImageView();
    }
}

document.getElementById('saveImage').addEventListener('click', function() {
    const file = document.getElementById('imageFile').files[0];
    const description = document.getElementById('imageDescription').value;
    
    if (!file) {
        alert('Bitte waehlen Sie ein Bild aus.');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('latitude', clickedLatLng.lat);
    formData.append('longitude', clickedLatLng.lng);
    formData.append('description', description);

    fetch('/api/images', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(image => {
        L.marker([image.latitude, image.longitude], {icon: imageIcon})
            .addTo(map)
            .on('click', () => showImageDetails(image));
        hideDialog('imageInput');
        document.getElementById('imageFile').value = '';
        document.getElementById('imageDescription').value = '';
        loadAllData();
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('deleteImage').addEventListener('click', function() {
    if (confirm('Sind Sie sicher, dass Sie dieses Bild loeschen moechten?')) {
        const imageId = currentImages[currentImageIndex]._id;
        deleteImage(imageId).then(() => {
            hideDialog('imageDetails');
            loadAllData();
        }).catch(error => {
            console.error('Error deleting image:', error);
            alert('Fehler beim Loeschen des Bildes. Bitte versuchen Sie es erneut.');
        });
    }
});

document.getElementById('editImageDescription').addEventListener('click', function() {
    const currentImage = currentImages[currentImageIndex];
    const newDescription = prompt('Neue Beschreibung eingeben:', currentImage.description);
    if (newDescription !== null && newDescription !== currentImage.description) {
        updateImageDescription(currentImage._id, newDescription)
            .then(() => {
                currentImage.description = newDescription;
                updateImageView();
            })
            .catch(error => {
                console.error('Error updating image description:', error);
                alert('Fehler beim Aktualisieren der Beschreibung. Bitte versuchen Sie es erneut.');
            });
    }
});

document.getElementById('addImageToSet').addEventListener('click', function() {
    hideDialog('imageDetails');
    showDialog('imageInput');
});