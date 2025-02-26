import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';
import Button from '../../components/button';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="landing-title">Bienvenidos al trabajo de final de corte 1</h1>
      <Button text="Iniciar" onClick={() => navigate('/dashboard')} className="start-button" />
    </div>
  );
}

export default LandingPage;