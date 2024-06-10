const requestDeleteFeature = (FeatureId) => {
    return fetch(`http://localhost:8000/api/delete/${FeatureId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .catch((error) => console.error('Error:', error));
}
export default requestDeleteFeature;