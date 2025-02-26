import React from 'react';
import './button.css';

function Button({ text, onClick, className = '' }) {
  return (
    <button className={`custom-button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;