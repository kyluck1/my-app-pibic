import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { realtimeDB } from './firebase';
import './Telao.css'; // Certifique-se de que o caminho está correto

const images = [
  { name: 'coracao', ext: 'png' },
  { name: 'raiva', ext: 'png' },
  { name: 'choro', ext: 'webp' },
  { name: 'palmas', ext: 'webp' }
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

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Função para definir posições horizontais fixas
  const getPosition = (index) => `${(index * 20) % 90}vw`; // Posições fixas com base no índice

  return (
    <div className="telao">
      {buttonPresses.map((press, index) => (
        <div
          key={press.timestamp}
          className="animated-image"
          style={{
            left: getPosition(index), // Define uma posição horizontal fixa com base no índice
            animation: `moveUp 4s forwards`, // Aplica a animação
            zIndex: index,
          }}
        >
          <img
            src={`/images/${images[press.button - 1].name}.${images[press.button - 1].ext}`}
            alt={`Button ${press.button}`}
            style={{ width: '100px', height: '100px' }} // Ajuste o tamanho conforme necessário
          />
        </div>
      ))}
    </div>
  );
}

export default Telao;
