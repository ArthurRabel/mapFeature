import Feature from 'ol/Feature';
import WKB from 'ol/format/WKB';

const createFeatures = (featureData) => {
    const format = new WKB();
    const features = featureData.map((feature) => {
        return new Feature({
            geometry: format.readGeometry(feature.coordinates),
            name: feature.name,
            description: feature.description,
            id: feature.id,
        });
    });
    return features;
}

export default createFeatures;