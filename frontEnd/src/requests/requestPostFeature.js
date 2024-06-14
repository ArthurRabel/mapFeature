const requestPostFeature = (name, description, coordinates) => {
    return fetch('http://localhost:8000/api/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            description: description,
            coordinates: coordinates,
        }),
    }).catch((error) => console.error('Error:', error));
}
export default requestPostFeature;