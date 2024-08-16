import React from 'react';
import { ref, push } from 'firebase/database';
import { realtimeDB } from './firebase';

// Caminho das imagens e palavras
const items = [
  { type: 'image', name: 'coracao', ext: 'png' },
  { type: 'image', name: 'raiva', ext: 'png' },
  { type: 'image', name: 'choro', ext: 'webp' },
  { type: 'image', name: 'palmas', ext: 'webp' },
  { type: 'text', content: 'surpreendente' },
  { type: 'text', content: 'triste' },
  { type: 'text', content: 'fabuloso' },
  { type: 'text', content: 'confuso' }
];

const ButtonsScreen = () => {
  const handleButtonClick = (itemId) => {
    const buttonRef = ref(realtimeDB, 'buttonPress');
    push(buttonRef, {
      button: itemId,
      timestamp: Date.now(), // Adiciona um timestamp para controle
    });
  };

  return (
    <div>
      {items.map((item, index) => (
        <button key={index} onClick={() => handleButtonClick(index + 1)}>
          {item.type === 'image' ? (
            <img 
              src={`/images/${item.name}.${item.ext}`} 
              alt={`Button ${index + 1}`} 
              style={{ width: '100px', height: '100px' }} 
            />
          ) : (
            <span>{item.content}</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default ButtonsScreen;
