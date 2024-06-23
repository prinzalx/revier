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

function uploadImage(latlng) {
    clickedLatLng = latlng;
    showDialog('imageInput');
}