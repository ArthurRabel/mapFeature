import './App.css';
import AddIcon from './assets/add_icon.svg?react';
import DeleteIcon from './assets/delete_icon.svg?react'
import CreateFeature from './components/CreateFeature';
import AboutFeature from './components/AboutFeature';
import createMap from './openLayers/createMap';
import createFeaturePrevision from './openLayers/createFeaturePrevision';
import createFeatures from './openLayers/createFeatures';
import requestFeatures from './requests/requestFeatures';
import requestDeleteFeature from './requests/requestDeleteFeature';
import { useSelector, useDispatch } from 'react-redux';
import { closedForm, openForm } from './actions/formSlice';
import { openAboutFeature, closedAboutFeature } from './actions/aboutFeatureSlice';
import { isAddingFeature } from './actions/AddingFeatureSlice';
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

  const showDescriptionFeature = useCallback((evento) => {
    if (mapRef.current.hasFeatureAtPixel(evento.pixel)) {
      mapRef.current.forEachFeatureAtPixel(evento.pixel, function (feature) {
        setName(feature.get("name"));
        setDescription(feature.get("description"));
        dispatch(openAboutFeature());
      });
    } else {
      dispatch(closedAboutFeature());
    }
  }, [mapRef.current]);

  const updateMap = () => {
    const layersArray = mapRef.current.getLayers().getArray();
    layersArray.find(layer => layer.get('name') === 'LayersFeaturesPrevision').getSource().clear();
    const LayersFeatures = layersArray.find(layer => layer.get('name') === 'LayersFeatures')
    LayersFeatures.getSource().clear();

    requestFeatures().then((featureData) => {
      LayersFeatures.getSource().addFeatures(createFeatures(featureData));
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

  const functionFeaturePrevision = (coordinate) => {
    const layerPrevision = mapRef.current.getLayers().getArray().find(layer => layer.get('name') === 'LayersFeaturesPrevision');
    layerPrevision.getSource().clear();

    const featurePrevision = createFeaturePrevision(coordinate);
    layerPrevision.getSource().addFeature(featurePrevision);

    mapRef.current.render();
  }

  const captureCoordinates = useCallback((evento) => {
    const featureFound = mapRef.current.hasFeatureAtPixel(evento.pixel);
    if (!featureFound) {
      setCoordinates(prevCoordinates => [...prevCoordinates, evento.coordinate]);
    }
  }, [mapRef.current]); 
  
  useEffect(() => {
    if (!mapRef.current) { mapRef.current = createMap(); }
    mapRef.current.on('pointermove', showDescriptionFeature);
  }, []);

  useEffect(() => {
    if (coordinates.length > 0) {
      functionFeaturePrevision(coordinates)
    }
  }, [coordinates]);

  // Adiciona evento de adicionar feature
  useEffect(() => {
    if (AddingFeature) {
      mapRef.current.un('pointermove', showDescriptionFeature);
      mapRef.current.on('click', captureCoordinates);
      dispatch(openForm());
    } else {
      mapRef.current.on('pointermove', showDescriptionFeature);
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
      {(AddingFeature || isRemovingFeature) && 
        <span className='base-layout notice'>
          {AddingFeature && <p>Clique no mapa para marcar os locais das features.</p>}
          {isRemovingFeature && <p>Clique na feature que deseja remover.</p>}
        </span>
      }
      <button onClick={() => {if(!isRemovingFeature){dispatch(isAddingFeature())}}} className='base-layout add-feature'><AddIcon /></button>
      <button onClick={() => {if(!AddingFeature){setIsRemovingFeature(true)}}} className='base-layout delete-feature'><DeleteIcon /></button>
      <div id="map"></div>
    </>
  );
}