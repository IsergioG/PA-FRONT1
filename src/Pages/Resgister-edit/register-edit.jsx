import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './register-edit.css';

function EditRegisterMagicGirl() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    city: '',
    state: 'Activa',
    contractDate: '',
    UpdateActulization: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (isEditing) {
      // Cargar datos de la chica mágica para edición
      const fetchGirlData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/app/${id}`);
          if (!response.ok) {
            throw new Error('ERROR');
          }
          const data = await response.json();
          setFormData(data);
        } catch (error) {
          console.error('Error al obtener los datos ', error);
        }
      };
      fetchGirlData();
    }
  }, [isEditing, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
      const handleDelete = async () => {
   
      try {
        const response = await fetch(`http://localhost:3000/app/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Error al eliminar el registro');
        }
        navigate('/dashboard');
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/app${isEditing ? `/${id}` : ''}`, {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Error');
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al enviar la informacion', error);
    }
  };

  return (
    <div className={`edit-register-container ${isEditing ? 'edit-mode' : 'register-mode'}`}>
      <h1>{isEditing ? 'Editar Chica Mágica' : 'Registrar Nueva Chica Mágica'}</h1>
      <form className="edit-register-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Edad:
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </label>
        <label>
          Ciudad de Origen:
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </label>
        <label>
          Estado:
          <select  name="state" value={formData.state} onChange={handleChange} >
            <option id="depl" value="activa">Activa</option>
            <option id="depl" value="desaparecida">Desaparecida</option>
            <option id="depl" value="rescatada">Rescatada</option>
          </select>
        </label>
        <label>
          Fecha de Contrato:
          <input type="date" name="contractDate" value={formData.contractDate} onChange={handleChange} required />
        </label>
        <div className="button-group">
            <button type="submit" className="submit-button">
              {isEditing ? 'Guardar Cambios' : 'Registrar'}
            </button>

            {isEditing && (
              <button type="button" className="submit-button" onClick={handleDelete}>
                Eliminar
              </button>
            )}
          </div>
      </form>
    </div>
  );
}

export default EditRegisterMagicGirl;
