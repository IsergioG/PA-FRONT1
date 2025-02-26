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
    status: 'Activa',
    contractDate: ''
  });

  useEffect(() => {
    if (isEditing) {
      // Simulación de carga de datos para edición - Reemplazar con fetch a la API
      const fakeData = {
        name: 'Homura Akemi',
        age: '14',
        city: 'Mitakihara',
        status: 'Activa',
        contractDate: '2023-03-10'
      };
      setFormData(fakeData);
    }
  }, [isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isEditing ? 'Editando chica mágica:' : 'Registrando nueva chica mágica:', formData);
    navigate('/dashboard');
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta chica mágica?')) {
      console.log('Eliminando chica mágica con ID:', id);
      navigate('/dashboard');
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
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Activa">Activa</option>
            <option value="Desaparecida">Desaparecida</option>
            <option value="Rescatada">Rescatada</option>
          </select>
        </label>
        <label>
        Fecha de Contrato:
          <input type="date" name="contractDate" value={formData.contractDate} onChange={handleChange} required />
        </label>
        <div className="button-group">
          <button type="submit" className="submit-button">{isEditing ? 'Guardar' : 'Registrar'}</button>
          {isEditing && <button type="submit" className="submit-button" onClick={handleDelete}>Eliminar</button>}
        </div>
      </form>
    </div>
  );
}

export default EditRegisterMagicGirl;