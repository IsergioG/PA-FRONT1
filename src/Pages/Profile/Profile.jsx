import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [girl, setGirl] = useState(null);

  useEffect(() => {
    const fetchGirl = async () => {
      try {
        const response = await fetch(`http://localhost:3000/app/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del perfil');
        }
        const data = await response.json();
        setGirl(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchGirl();
  }, [id]);

  if (!girl) {
    return <div className="profile-container">Cargando...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Perfil de {girl.name}</h1>
      <div className="profile-details">
        <p><strong>Nombre:</strong> {girl.name}</p>
        <p><strong>Edad:</strong> {girl.age} años</p>
        <p><strong>Ciudad de Origen:</strong> {girl.city}</p>
        <p><strong>Estado:</strong> {girl.state}</p>
        <p><strong>Fecha de Contrato:</strong> {girl.contractDate}</p>
        <p><strong>Última Actualización:</strong> {girl.UpdateActulization}</p>
      </div>
      <button className="edit-button" onClick={() => navigate(`/editar/${id}`)}>Editar</button>
    </div>
  );
}

export default Profile;
