import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

const featurePrevision = (evento) => {
    return new Feature({
        geometry: new Point(evento.coordinate),
        style: new Style({
            image: new CircleStyle({
                radius: 6,
                fill: new Fill({ color: 'red' }),
                stroke: new Stroke({ color: 'white', width: 2 }),
            }),
        }),
  });
}
export default featurePrevision;