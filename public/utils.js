function sanitizeInput(input) {
    return DOMPurify.sanitize(input);
}

function escapeOutput(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function validateCoordinates(lat, lng) {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    return !isNaN(latNum) && !isNaN(lngNum) && 
           latNum >= -90 && latNum <= 90 && 
           lngNum >= -180 && lngNum <= 180;
}

function validateImageFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return file && validTypes.includes(file.type) && file.size <= 5 * 1024 * 1024; // 5MB max
}
