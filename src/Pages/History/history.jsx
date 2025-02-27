import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './history.css';

function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:3000/history/');
        if (!response.ok) {
          throw new Error('Error al obtener el historial de registros');
        }
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h1>Historial de Registros Modificados</h1>
      <div className="history-table">
        <div className="history-header">
          <div>Nombre</div>
          <div>Edad</div>
          <div>Ciudad</div>
          <div>Estado</div>
          <div>Fecha de Contrato</div>
          <div>Última Actualización</div>
        </div>
        <div className="history-scroll">
          {history.length > 0 ? (
            history.map((record, index) => (
              <div key={index} className="history-row">
                <div>{record.name}</div>
                <div>{record.age}</div>
                <div>{record.city}</div>
                <div>{record.state}</div>
                <div>{record.contractDate}</div>
                <div>{record.UpdateActulization}</div>
              </div>
            ))
          ) : (
            <p className="no-history">No hay registros disponibles.</p>
          )}
        </div>
      </div>
      <button className="back-button" onClick={() => navigate('/dashboard')}>Volver al Dashboard</button>
    </div>
  );
}

export default History;
