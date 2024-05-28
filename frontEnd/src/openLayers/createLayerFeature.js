import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import WKB from 'ol/format/WKB';

const createVectorLayer = (featureData) => {
    const format = new WKB();
    return new VectorLayer({
        source: new VectorSource({
            features: featureData.map((feature) => {
                return new Feature({
                    geometry: format.readGeometry(feature.coordinates),
                    name: feature.name,
                    description: feature.description,
                    id: feature.id,
                });
            })
        }),
        name: 'LayersFeatures',
    });
}

export default createVectorLayer;