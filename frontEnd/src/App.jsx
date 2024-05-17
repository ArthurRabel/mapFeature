import './App.css'
import CreateFeature from './components/CreateFeature';
import AboutFeature from './components/AboutFeature';
import createMap from './openLayers/createMap';
import createVectorLayer from './openLayers/createLayerFeature';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleForm } from './actions/formSlice';
import { toggleAboutFeature } from './actions/aboutFeatureSlice';
import { useRef, useState } from 'react';

export default function App() {
  const dispatch = useDispatch();
  const featureData = useSelector((state) => state.feicao);
  const formToggle = useSelector((state) => state.form.isOpen);
  const AboutFeatureToggle = useSelector((state) => state.aboutFeature.isOpen);

  const [coordinates, setCoordinates] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const mapRef = useRef();
  const addFeatureRef = useRef();


  useEffect(() => {
    // Cria o mapa
    if (!mapRef.current) {
      mapRef.current = createMap();
    }

    mapRef.current.on('click', function (evento) {
      mapRef.current.forEachFeatureAtPixel(evento.pixel, function (feature) {
        setName(feature.get("name"));
        setDescription(feature.get("description"));
        dispatch(toggleAboutFeature());
      });
    });

    addFeatureRef.current = (evento) => {
      let featureFound = mapRef.current.hasFeatureAtPixel(evento.pixel);
      if (!featureFound) {
        setCoordinates(prevCoordinates => [...prevCoordinates, evento.coordinate]);
        dispatch(toggleForm());
      }
    }
    // Adiciona um evento de clique ao mapa
    document.querySelector('#add-feature').addEventListener('click', () => {
      mapRef.current.on('click', addFeatureRef.current);
    })

  }, []);

  // Atualiza as feições no mapa 
  useEffect(() => {
    mapRef.current.un('click', addFeatureRef.current );
    const vectorLayer = createVectorLayer(featureData);

    const layerToRemove = mapRef.current.getLayers().getArray().find(layer => layer.get('name') === 'LayersFeatures');
    mapRef.current.removeLayer(layerToRemove);
    mapRef.current.addLayer(vectorLayer);
    mapRef.current.render();

  }, [featureData]);

  return (
    <>
      {AboutFeatureToggle && <AboutFeature data={{ 'name': name, 'description': description }} />}
      {formToggle && <CreateFeature coordinates={coordinates} />}
      <button id="add-feature" className='base-layout div-add-feature'>Add Feature</button>
      <div id="map"></div>
    </>
  );
}