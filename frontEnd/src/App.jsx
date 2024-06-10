import './App.css';
import AddIcon from './assets/add_icon.svg?react';
import DeleteIcon from './assets/delete_icon.svg?react'
import CreateFeature from './components/CreateFeature';
import AboutFeature from './components/AboutFeature';
import createMap from './openLayers/createMap';
import createVectorLayer from './openLayers/createLayerFeature';
import requestFeatures from './requests/requestFeatures';
import requestDeleteFeature from './requests/requestDeleteFeature';
import { useSelector, useDispatch } from 'react-redux';
import { closedForm, openForm } from './actions/formSlice';
import { openAboutFeature, closedAboutFeature } from './actions/aboutFeatureSlice';
import { isAddingFeature, notAddingFeature } from './actions/AddingFeatureSlice';
import { useRef, useState, useCallback, useEffect } from 'react';

export default function App() {
  const dispatch = useDispatch();
  const isOpenForm = useSelector((state) => state.form.isOpen);
  const AboutFeatureToggle = useSelector((state) => state.aboutFeature.isOpen);
  const AddingFeature = useSelector((state) => state.AddingFeature.addingFeature);

  const [coordinates, setCoordinates] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isRemovingFeature, setIsRemovingFeature] = useState(false);

  const mapRef = useRef();
  const addFeatureRef = useRef();
  const deleteFeatureRef = useRef();

  const showDescriptionFeature = (map) => {
    map.on('pointermove', function (evento) {
      const featureFound = mapRef.current.hasFeatureAtPixel(evento.pixel);
      if (featureFound) {
        map.forEachFeatureAtPixel(evento.pixel, function (feature) {
          setName(feature.get("name"));
          setDescription(feature.get("description"));
          dispatch(openAboutFeature());
        });
      } else {
        dispatch(closedAboutFeature());
      }
    });
  };

  const updateMap = () => {
    const layerToRemove = mapRef.current.getLayers().getArray().find(layer => layer.get('name') === 'LayersFeatures');
    mapRef.current.removeLayer(layerToRemove);

    requestFeatures().then((featureData) => {
      const vectorLayer = createVectorLayer(featureData);
      mapRef.current.addLayer(vectorLayer);
      mapRef.current.render();
    });
  }

  const deleteFeature = useCallback((evento) => {
    map.forEachFeatureAtPixel(evento.pixel, function (feature) {
      requestDeleteFeature(feature.get("id")).then(() => {
        updateMap();
        setIsRemovingFeature(false);
      });
    });
  }, [mapRef.current]);

  const captureCoordinates = useCallback((evento) => {
    dispatch(openForm());
    const featureFound = mapRef.current.hasFeatureAtPixel(evento.pixel);
    if (!featureFound) {
      setCoordinates(prevCoordinates => [...prevCoordinates, evento.coordinate]);
    }
  }, [mapRef.current]);

  useEffect(() => {
    if (!mapRef.current) { mapRef.current = createMap(); }
    showDescriptionFeature(mapRef.current);
  }, []);

  // Adiciona evento de adicionar feature
  useEffect(() => {
    if (AddingFeature) {
      mapRef.current.on('click', captureCoordinates);
      dispatch(openForm());
    } else {
      mapRef.current.un('click', captureCoordinates);
      dispatch(closedForm());
      setCoordinates([]);
      updateMap();
    }
  }, [AddingFeature]);

  // Adiciona evento de remover feature
  useEffect(() => { 
    if (isRemovingFeature) {
      mapRef.current.on('click', deleteFeature);
    } else {
      mapRef.current.un('click', deleteFeature);
    }
  }, [isRemovingFeature]);

  return (
    <>
      {AboutFeatureToggle && <AboutFeature data={{ 'name': name, 'description': description }} />}
      {isOpenForm && <CreateFeature key={coordinates} coordinates={coordinates} />}
      <button onClick={() => {if(!isRemovingFeature){dispatch(isAddingFeature())}}} className='base-layout div-add-feature'><AddIcon /></button>
      <button onClick={() => {if(!AddingFeature){setIsRemovingFeature(true)}}} className='base-layout div-delete-feature'><DeleteIcon /></button>
      <div id="map"></div>
    </>
  );
}