import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ active: 0, disappeared: 0, rescued: 0 });
  const [allMagicGirls, setAllMagicGirls] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchMagicGirls = async () => {
      try {
        const response = await fetch('http://localhost:3000/app');
        if (!response.ok) {
          throw new Error('Error ');
        }
        const data = await response.json();
        console.log(data);
        
        setAllMagicGirls(data.all);
        setStats({
          active: data.state.active.length,
          disappeared: data.state.disappeared.length,
          rescued: data.state.rescued.length
        });
      } catch (error) {
        console.error('Error al obtener:', error);
      }
    };

    fetchMagicGirls();
  }, []);

  const handleNewRegistration = () => {
    navigate('/registro');
  };

  const handleHistory = () => {
    navigate('/history');
  };
  const handleGirlClick = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="dashboard-container">
      <h1>Gestión de Chicas Mágicas</h1>

      <div className="stats-container">
        <div className="stat-card active">Activas: {stats.active}</div>
        <div className="stat-card disappeared">Desaparecidas: {stats.disappeared}</div>
        <div className="stat-card rescued">Rescatadas: {stats.rescued}</div>
      </div>

      <h2>Listado Completo de Chicas Mágicas</h2>
      <input 
        type="text" 
        placeholder="Filtrar por estado..." 
        className="filter-input" 
        value={filter} 
        onChange={(e) => setFilter(e.target.value.toLowerCase())} 
      />
      
      <div className="magic-girls-container">
        <div className="magic-girls-header">
          <div className="header-name">Nombre</div>
          <div className="header-status">Estado</div>
          <div className="header-contract">Fecha de Contrato</div>
        </div>
        <div className="magic-girls-scroll">
          {allMagicGirls.filter(girl => girl.state.toLowerCase().includes(filter)).map((girl) => (
              <div key={girl.id} className="girl-row" onClick={() => handleGirlClick(girl.id)}>
                <div className="girl-name">{girl.name}</div>
                <div className="girl-status">{girl.state}</div>
                <div className="girl-contract">{girl.contractDate}</div>
              </div>
            ))}
        </div>
      </div>

      <button className="register-button" onClick={handleNewRegistration}>
        Registrar
      </button>

      <button className="register-button" onClick={handleHistory}>
        Historial
      </button>
    </div>
  );
}

export default Dashboard;
