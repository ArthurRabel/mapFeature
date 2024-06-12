import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';

const createFeaturePrevision = (coordinate) => {
    let arrayCoordinate = [...coordinate];
    let geometryType;
    if(arrayCoordinate.length == 1) {
        geometryType = new Point(arrayCoordinate[0]);
    } else if(arrayCoordinate.length == 2) {
        geometryType = new LineString(arrayCoordinate);
    } else {
        arrayCoordinate.push(arrayCoordinate[0])
        geometryType = new Polygon([arrayCoordinate]);
    }

    return new Feature({
        geometry: geometryType,
    });
}

export default createFeaturePrevision;