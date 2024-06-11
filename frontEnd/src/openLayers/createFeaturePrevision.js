import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

const createFeaturePrevision = (evento) => {
    return new Feature({
        geometry: new Point(evento.coordinate),
    })
}

export default createFeaturePrevision;