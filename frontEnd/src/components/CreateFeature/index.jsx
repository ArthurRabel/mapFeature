import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closedForm } from '../../actions/formSlice';
import './style.css';

export default function CreateFeature({coordinates}) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    document.querySelector('#submitForm').addEventListener('click', (event) => {
      fetch('http://localhost:8000/api/post/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: document.querySelector('#name').value,
          description: document.querySelector('#description').value,
          coordinates: coordinates,
        }),
      }).then(() => dispatch(closedForm()));
    });
  }, []);
  return (
    <section className="create-feature base-layout">
      <h2 className="create-feature__title">Create Feature</h2>
      <div className="create-feature__form">
        <input id="name" type="text" placeholder="Name" />
        <input id="description" type="text" placeholder="description" />
        <input id="submitForm"type="button" value="Submit" />
      </div>
    </section>
  )
}
