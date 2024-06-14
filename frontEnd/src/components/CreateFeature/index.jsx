import React, { useEffect } from 'react';
import requestPostFeature from '../../requests/requestPostFeature';
import { useDispatch } from 'react-redux';
import { notAddingFeature } from '../../actions/AddingFeatureSlice';
import './style.css';

export default function CreateFeature({ coordinates }) {
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector('#submitForm').addEventListener('click', (event) => {
      requestPostFeature(document.querySelector('#name').value, document.querySelector('#description').value, coordinates).then(() => { dispatch(notAddingFeature()) });
    });
  }, []);
  return (
    <section className="create-feature base-layout">
      <h2 className="create-feature__title">Create Feature</h2>
      <div className="create-feature__form">
        <input id="name" type="text" placeholder="Name" />
        <input id="description" type="text" placeholder="description" />
        <input id="submitForm" type="button" value="Submit" />
      </div>
    </section>
  )
}
