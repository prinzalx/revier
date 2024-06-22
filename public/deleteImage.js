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
        throw error;
    }
}