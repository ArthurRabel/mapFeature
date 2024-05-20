import './App.css'
import CreateFeature from './components/CreateFeature';
import AboutFeature from './components/AboutFeature';
import createMap from './openLayers/createMap';
import createVectorLayer from './openLayers/createLayerFeature';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openForm } from './actions/formSlice';
import { toggleAboutFeature } from './actions/aboutFeatureSlice';
import { useRef, useState } from 'react';

export default function App() {
  const dispatch = useDispatch();
  const featureData = useSelector((state) => state.feature);
  const isOpenForm = useSelector((state) => state.form.isOpen);
  const AboutFeatureToggle = useSelector((state) => state.aboutFeature.isOpen);

  const [coordinates, setCoordinates] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isAddingFeature, setIsAddingFeature] = useState(false);

  const mapRef = useRef();
  const addFeatureRef = useRef();

  const showFeature = (map) => {
    map.on('click', function (evento) {
      map.forEachFeatureAtPixel(evento.pixel, function (feature) {
        setName(feature.get("name"));
        setDescription(feature.get("description"));
        dispatch(toggleAboutFeature());
      });
    });
  };

  const updateMap = () => {
    const layerToRemove = mapRef.current.getLayers().getArray().find(layer => layer.get('name') === 'LayersFeatures');
    mapRef.current.removeLayer(layerToRemove);

    const vectorLayer = createVectorLayer(featureData);
    mapRef.current.addLayer(vectorLayer);
    mapRef.current.render();
  }

  const addFeature = (evento) => {
    const featureFound = mapRef.current.hasFeatureAtPixel(evento.pixel);
    if (!featureFound) {
      setCoordinates(prevCoordinates => [...prevCoordinates, evento.coordinate]);
    }
  }

  // Inicializa o mapa e adiciona evento para ver os detalhes da feature
  useEffect(() => {
    if (!mapRef.current) {mapRef.current = createMap();}
    showFeature(mapRef.current);
    addFeatureRef.current = addFeature;
  }, []);

  // Abre o formulario para adicionar feature
  useEffect(() => {
    if(coordinates.length > 0){
      dispatch(openForm());
    }
  }, [coordinates]);

  // Adiciona evento de adicionar feature
  useEffect(() => {
    if (isAddingFeature) {
      mapRef.current.on('click', addFeatureRef.current);
    } else {
      mapRef.current.un('click', addFeatureRef.current);
    }
    }, [isAddingFeature]);

  // Apos envio do formulario o mapa atualiza e remove o evento de adicionar feature
  useEffect(() => {
    setCoordinates([]);
    setIsAddingFeature(false);
    updateMap();
  }, [featureData]);

  return (
    <>
      {AboutFeatureToggle && <AboutFeature data={{ 'name': name, 'description': description }} />}
      {isOpenForm && <CreateFeature key={coordinates} coordinates={coordinates} />}
      <button onClick={() => setIsAddingFeature(true)} className='base-layout div-add-feature'>Add Feature</button>
      <div id="map"></div>
    </>
  );
}