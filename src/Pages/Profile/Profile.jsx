import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [girl, setGirl] = useState(null);

  useEffect(() => {
    const fetchGirl = async () => {
      const fakeData = [
        { id: 1, name: 'Madoka Kaname', status: 'Rescatada', contractDate: '2023-01-15', city: 'Mitakihara', age: 14 },
        { id: 2, name: 'Homura Akemi', status: 'Activa', contractDate: '2023-03-10', city: 'Mitakihara', age: 14 },
        { id: 3, name: 'Sayaka Miki', status: 'Desaparecida', contractDate: '2023-05-20', city: 'Mitakihara', age: 14 }
      ];
      const foundGirl = fakeData.find(g => g.id === parseInt(id));
      if (foundGirl) {
        setGirl(foundGirl);
      } else {
        console.error("No se encontró la chica mágica con ID:", id);
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
        <p><strong>Estado:</strong> {girl.status}</p>
        <p><strong>Fecha de Contrato:</strong> {girl.contractDate}</p>
      </div>
      <button className="edit-button" onClick={() => navigate(`/editar/${id}`)}>Editar</button>
    </div>
  );
}

export default Profile;