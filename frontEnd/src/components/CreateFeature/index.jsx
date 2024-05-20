import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addFeature } from '../../actions/featureSlice';
import { closedForm } from '../../actions/formSlice';
import './style.css';

export default function CreateFeature(coordinates) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    /* Envia o formulario para o Redux */
    document.querySelector('.create-feature__form').addEventListener('submit', (event) => {
      event.preventDefault();
      console.log("no formulario ta ",coordinates)
      dispatch(addFeature({
        geometry: coordinates,
        name: document.querySelector('#name').value,
        description: document.querySelector('#description').value,
      }));
      dispatch(closedForm());
    });
  }, []);
  return (
    <section className="create-feature base-layout">
      <h2 className="create-feature__title">Create Feature</h2>
      <form className="create-feature__form" action="" method="post">
        <input id="name" type="text" placeholder="Name" />
        <input id="description" type="text" placeholder="description" />
        <input type="submit" value="Submit" />
      </form>
    </section>
  )
}
