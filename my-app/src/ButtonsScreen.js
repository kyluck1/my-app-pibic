import React from 'react';
import { ref, push } from 'firebase/database';
import { realtimeDB } from './firebase';

// Caminho das imagens
const images = [
  { name: 'coracao', ext: 'png' },
  { name: 'raiva', ext: 'png' },
  { name: 'choro', ext: 'webp' },
  { name: 'palmas', ext: 'webp' }
];

const ButtonsScreen = () => {
  const handleButtonClick = (buttonId) => {
    const buttonRef = ref(realtimeDB, 'buttonPress');
    push(buttonRef, {
      button: buttonId,
      timestamp: Date.now(), // Adiciona um timestamp para controle
    });
  };

  return (
    <div>
      {images.map((image, index) => (
        <button key={index} onClick={() => handleButtonClick(index + 1)}>
          <img 
            src={`/images/${image.name}.${image.ext}`} // Ajusta a extensão do arquivo conforme necessário
            alt={`Button ${index + 1}`} 
            style={{ width: '100px', height: '100px' }} // Ajuste o tamanho conforme necessário
          />
        </button>
      ))}
    </div>
  );
};

export default ButtonsScreen;
