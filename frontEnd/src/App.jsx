import './App.css'
import CreateFeature from './components/CreateFeature';
import AboutFeature from './components/AboutFeature';
import { createMap } from './openLayers/createMap.js';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleForm } from './actions/formSlice';
import { toggleAboutFeature } from './actions/aboutFeatureSlice';
import { useRef, useState } from 'react';

export default function App() {

  const featureData = useSelector((state) => state.feicao);
  const formToggle = useSelector((state) => state.form.isOpen);
  const AboutFeatureToggle = useSelector((state) => state.aboutFeature.isOpen);
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Usa useRef para evitar que o mapa seja renderizado mais de uma vez pelo useEffect
  const mapRef = useRef();

  useEffect(() => {

    // Cria o mapa
    if (!mapRef.current) {
      mapRef.current = createMap();
    }

    // Adiciona um evento de clique ao mapa
    mapRef.current.on('click', function (evento) {
      let featureFound = false;

      mapRef.current.forEachFeatureAtPixel(evento.pixel, function (feature, layer) {
        featureFound = true;
        setName(feature.get("name"));
        setDescription(feature.get("description"));
        dispatch(toggleAboutFeature());
      });

      if (!featureFound) {
        setCoordinates(evento.coordinate);
        dispatch(toggleForm());
      }
    });
  }, []);

  /* Atualiza as feições no mapa */
  useEffect(() => {
    /* Cria a camada de feições */
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: featureData.map((feicao) => new Feature({
          geometry: new Point(feicao.geometry.coordinates),
          name: feicao.name,
          description: feicao.description,
        }))
      }),
      style: new Style({
        image: new Circle({
          radius: 10,
          fill: new Fill({ color: 'white' }),
          stroke: new Stroke({ color: '#7aacff', width: 2 }),
        }),
      }),
      name: 'LayersFeatures',
    });

    /* Remove a camada de feições antiga */
    const layers = mapRef.current.getLayers().getArray();
    const layersToRemove = layers.find(layer => layer.get('name') === 'LayersFeatures');
    if (layersToRemove) { mapRef.current.removeLayer(layersToRemove); }

    /* Adiciona a nova camada com as novas feicoes*/
    mapRef.current.addLayer(vectorLayer);


    /* Renderiza o mapa */
    mapRef.current.render();

  }, [featureData]);

  return (
    <>
      {AboutFeatureToggle && <AboutFeature data={{'name': name, 'description': description}}/>}
      {formToggle && <CreateFeature coordinates={coordinates} />}
      <div id="map"></div>
    </>
  );
}