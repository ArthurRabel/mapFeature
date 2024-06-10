const requestFeatures = () => {
    return fetch('http://localhost:8000/api/get/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error:', error)); 
}
export default requestFeatures;