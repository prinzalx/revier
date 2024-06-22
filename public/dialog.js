document.addEventListener('DOMContentLoaded', function() {
    // Funktion zum Anzeigen eines Dialogs
    function showDialog(dialogId) {
        document.getElementById(dialogId).style.display = 'block';
    }

    // Funktion zum Verbergen eines Dialogs
    function hideDialog(dialogId) {
        document.getElementById(dialogId).style.display = 'none';
    }

    // Funktion zum Anzeigen des Aktionsmodals
    function showActionModal(latlng) {
        clickedLatLng = latlng;
        showDialog('actionModal');
    }

    // Event-Listener f�r Schlie�en-Buttons
    document.getElementById('closeImageDetails').addEventListener('click', () => hideDialog('imageDetails'));
    document.getElementById('closeNoteDetails').addEventListener('click', () => hideDialog('noteDetails'));

    // Event-Listener f�r Abbrechen-Buttons
    document.getElementById('cancelAction').addEventListener('click', () => hideDialog('actionModal'));
    document.getElementById('cancelImage').addEventListener('click', () => hideDialog('imageInput'));
    document.getElementById('cancelNote').addEventListener('click', () => hideDialog('noteInput'));

    // Event-Listener f�r "Bild hinzuf�gen" Button
    document.getElementById('addImage').addEventListener('click', function() {
        hideDialog('actionModal');
        showDialog('imageInput');
    });

    // Event-Listener f�r "Notiz hinzuf�gen" Button
    document.getElementById('addNote').addEventListener('click', function() {
        hideDialog('actionModal');
        showDialog('noteInput');
    });

    // Event-Listener f�r das Bearbeiten der Bildbeschreibung
    document.getElementById('editImageDescription').addEventListener('click', function() {
        const currentSlide = $('.slick-current');
        const currentDescription = currentSlide.find('p').text();
        const newDescription = prompt('Neue Beschreibung eingeben:', currentDescription);
        if (newDescription !== null) {
            currentSlide.find('p').text(newDescription);
            // Hier sollte ein API-Aufruf zum Speichern der neuen Beschreibung erfolgen
        }
    });

    // Event-Listener f�r das Hinzuf�gen eines Bildes zum Set
    document.getElementById('addImageToSet').addEventListener('click', function() {
        hideDialog('imageDetails');
        showDialog('imageInput');
    });

    // Event-Listener f�r das L�schen eines Bildes
    document.getElementById('deleteImage').addEventListener('click', function() {
        if (confirm('Sind Sie sicher, dass Sie dieses Bild loeschen moechten?')) {
            const currentSlide = $('.slick-current');
            const imageId = currentSlide.data('imageId');
            deleteImage(imageId).then(() => {
                hideDialog('imageDetails');
                loadAllData();
            }).catch(error => {
                console.error('Error deleting image:', error);
                alert('Fehler beim Loeschen des Bildes. Bitte versuchen Sie es erneut.');
            });
        }
    });

    // Machen Sie die Funktionen global verf�gbar
    window.showDialog = showDialog;
    window.hideDialog = hideDialog;
    window.showActionModal = showActionModal;
});