document.addEventListener('DOMContentLoaded', function() {
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

        uploadImage(formData)
            .then(image => {
                L.marker([image.latitude, image.longitude], {icon: imageIcon})
                    .addTo(map)
                    .on('click', () => showImageDetails(image));
                hideDialog('imageInput');
                document.getElementById('imageFile').value = '';
                document.getElementById('imageDescription').value = '';
                if (currentImageSet) {
                    addImageToSet(image);
                }
            })
            .catch(error => console.error('Error:', error));
    });
});