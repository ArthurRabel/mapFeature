import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

const createMap = () => {
    return map = new Map({
      /* Define o id do elemento que vai receber o mapa */
      target: 'map',
      /* Adiciona a camada de fundo */
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: []
          }),
          name: 'LayersFeatures',
        }),
        new VectorLayer({
          source: new VectorSource({
            features: []
          }),
          name: 'LayersFeaturesPrevision',
        })
      ],

      /* Define a visualização inicial */
      view: new View({
        center: [-5321776.2801238755, -1780070.8812950752],
        zoom: 12,
      }),
    });
}

export default createMap;