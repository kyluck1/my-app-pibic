import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { realtimeDB } from './firebase';
import './Telao.css'; // Certifique-se de que o caminho está correto

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

function Telao() {
  const [buttonPresses, setButtonPresses] = useState([]);

  useEffect(() => {
    const buttonRef = ref(realtimeDB, 'buttonPress');
    const unsubscribe = onValue(buttonRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const presses = Object.values(data);
        setButtonPresses(presses);
      }
    });

    return () => unsubscribe();
  }, []);

  // Função para definir posições horizontais fixas
  const getPosition = (index) => `${(index * 20) % 90}vw`;

  return (
    <div className="telao">
      {buttonPresses.map((press, index) => {
        const item = items[press.button - 1];
        const className = item.type === 'text' ? `word ${item.content}` : '';

        return (
          <div
            key={press.timestamp}
            className={`animated-item ${className}`}
            style={{
              left: getPosition(index),
              animation: `moveUp 4s forwards`,
              zIndex: index,
            }}
          >
            {item.type === 'image' ? (
              <img
                src={`/images/${item.name}.${item.ext}`}
                alt={`Button ${press.button}`}
                style={{ width: '100px', height: '100px' }}
              />
            ) : (
              <span>{item.content}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Telao;
