import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ active: 0, disappeared: 0, rescued: 0 });
  const [magicGirls, setMagicGirls] = useState([]);
  const [allMagicGirls, setAllMagicGirls] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Simulación de datos - Reemplazar con fetch a la API
    setStats({ active: 5, disappeared: 2, rescued: 3 });
    setMagicGirls([
      { id: 1, name: 'Madoka Kaname', status: 'Rescatada', contractDate: '2023-01-15' },
      { id: 2, name: 'Homura Akemi', status: 'Activa', contractDate: '2023-03-10' },
      { id: 3, name: 'Sayaka Miki', status: 'Desaparecida', contractDate: '2023-05-20' }
    ]);
  }, []);

  useEffect(() => {
    // Simulación de carga de datos paginados
    const loadMoreGirls = () => {
        setAllMagicGirls(prevGirls => [
          ...prevGirls,
          { id: prevGirls.length + 1, name: `Chica Mágica ${prevGirls.length + 10}`, status: 'Activa', contractDate: '2024-02-10' }
        ]);
  
    };

    loadMoreGirls();
  }, [page]);

  const handleNewRegistration = () => {
    navigate('/registro');
  };

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setPage(prevPage => prevPage + 1);
    }
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
      <p>Selecciona una chica para editar</p>
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
        <div className="magic-girls-scroll" onScroll={handleScroll}>
          {magicGirls
            .filter(girl => girl.status.toLowerCase().includes(filter))
            .map((girl) => (
              <div key={girl.id} className="girl-row" onClick={() => handleGirlClick(girl.id)}>
                <div className="girl-name">{girl.name}</div>
                <div className="girl-status">{girl.status}</div>
                <div className="girl-contract">{girl.contractDate}</div>
              </div>
            ))}
        </div>
      </div>

      <button className="register-button" onClick={handleNewRegistration}>
        Registrar Nueva Chica Mágica
      </button>
    </div>
  );
}

export default Dashboard;