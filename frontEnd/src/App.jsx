import './App.css';
import AddIcon from './assets/add_icon.svg?react';
import DeleteIcon from './assets/delete_icon.svg?react'
import CreateFeature from './components/CreateFeature';
import AboutFeature from './components/AboutFeature';
import createMap from './openLayers/createMap';
import createVectorLayer from './openLayers/createLayerFeature';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openForm } from './actions/formSlice';
import { openAboutFeature, closedAboutFeature } from './actions/aboutFeatureSlice';
import { useRef, useState } from 'react';

export default function App() {
  const dispatch = useDispatch();
  const isOpenForm = useSelector((state) => state.form.isOpen);
  const AboutFeatureToggle = useSelector((state) => state.aboutFeature.isOpen);

  const [coordinates, setCoordinates] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const [isRemovingFeature, setIsRemovingFeature] = useState(false);

  const mapRef = useRef();
  const addFeatureRef = useRef();
  const deleteFeatureRef = useRef();

  const requestFeatures = () => {
    return fetch('http://127.0.0.1:8081/api/get/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error:', error));
  }

  const requestDeleteFeature = (FeatureId) => {
    return fetch('http://127.0.0.1:8081/api/delete/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'id': FeatureId }),
    })
      .catch((error) => console.error('Error:', error));
  }

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

  const deleteFeature = (evento) => {
    map.forEachFeatureAtPixel(evento.pixel, function (feature) {
      requestDeleteFeature(feature.get("id")).then(() => {
        updateMap();
        setIsRemovingFeature(false);
      });
    });
  }

  const addFeature = (evento) => {
    const featureFound = mapRef.current.hasFeatureAtPixel(evento.pixel);
    if (!featureFound) {
      setCoordinates(prevCoordinates => [...prevCoordinates, evento.coordinate]);
    }
  }

  useEffect(() => {
    if (!mapRef.current) { mapRef.current = createMap(); }
    addFeatureRef.current = addFeature;
    deleteFeatureRef.current = deleteFeature;
    showDescriptionFeature(mapRef.current);
  }, []);

  // Abre o formulario para adicionar feature
  useEffect(() => {
    if (coordinates.length > 0) {
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

  // Adiciona evento de adicionar feature
  useEffect(() => {
    if (isRemovingFeature) {
      mapRef.current.on('click', deleteFeatureRef.current);
    } else {
      mapRef.current.un('click', deleteFeatureRef.current);
    }
  }, [isRemovingFeature]);

  // Apos envio do formulario o mapa atualiza e remove o evento de adicionar feature
  useEffect(() => {
    if (!isOpenForm) {
      setCoordinates([]);
      setIsAddingFeature(false);
      updateMap();
    }
  }, [isOpenForm]);

  return (
    <>
      {AboutFeatureToggle && <AboutFeature data={{ 'name': name, 'description': description }} />}
      {isOpenForm && <CreateFeature key={coordinates} coordinates={coordinates} />}
      <button onClick={() => setIsAddingFeature(true)} className='base-layout div-add-feature'><AddIcon /></button>
      <button onClick={() => setIsRemovingFeature(true)} className='base-layout div-delete-feature'><DeleteIcon /></button>
      <div id="map"></div>
    </>
  );
}