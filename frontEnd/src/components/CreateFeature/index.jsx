import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeicao } from '../../actions/feicaoSlice';
import { toggleForm } from '../../actions/formSlice';
import './style.css';

export default function CreateFeature(coordinates) {
  const featureData = useSelector((state) => state.feicao);
  const formToggle = useSelector((state) => state.form);
  const dispatch = useDispatch();

  useEffect(() => {
    /* Envia o formulario para o Redux */
    document.querySelector('.create-feature__form').addEventListener('submit', (event) => {
      event.preventDefault();
      dispatch(addFeicao({
        geometry: coordinates,
        name: document.querySelector('#name').value,
        description: document.querySelector('#description').value,
      }));
      dispatch(toggleForm());
    });
  }, []);
  return (
    <section className="base-Layout">
      <h2 className="create-feature__title">Create Feature</h2>
      <form className="create-feature__form" action="" method="post">
        <input id="name" type="text" placeholder="Name" />
        <input id="description" type="text" placeholder="description" />
        <input type="submit" value="Submit" />
      </form>
    </section>
  )
}
