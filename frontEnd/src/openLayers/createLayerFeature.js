import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';

const createVectorLayer = (featureData) => {
    return new VectorLayer({
        source: new VectorSource({
            features: featureData.map((feature) => {
                console.log(feature.geometry.coordinates)
                let geometry;
                if(feature.geometry.coordinates.length == 1) {
                    geometry = new Point(feature.geometry.coordinates[0]);
                } else if(feature.geometry.coordinates.length == 2) {
                    geometry = new LineString(feature.geometry.coordinates);
                } else {
                    feature.geometry.coordinates.push(feature.geometry.coordinates[0])
                    geometry = new Polygon([feature.geometry.coordinates]);
                }

                return new Feature({
                    geometry: geometry,
                    name: feature.name,
                    description: feature.description,
                });
            })
        }),
        name: 'LayersFeatures',
    });
}

export default createVectorLayer;