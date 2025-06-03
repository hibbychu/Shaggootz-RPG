import React, { useState, useEffect } from 'react';
import { mapData } from './data/map';
import { Map } from './components/Map';
import { Player } from './components/Player';
import { Item } from './components/Item';

const initialItems = [
  { id: 1, x: 3, y: 2 },
  { id: 2, x: 6, y: 4 },
  { id: 3, x: 7, y: 7 },
];

function isWalkable(x: number, y: number) {
  return mapData[y] && mapData[y][x] === 0;
}

const START_POS = { x: 1, y: 1 };

function App() {
  const [pos, setPos] = useState(START_POS);
  const [items, setItems] = useState(initialItems);
  const [score, setScore] = useState(0);

  function handleMove(newX: number, newY: number) {
    if (!isWalkable(newX, newY)) return;
    setPos({ x: newX, y: newY });

    const foundItem = items.find(item => item.x === newX && item.y === newY);
    if (foundItem) {
      setItems(items.filter(item => item.id !== foundItem.id));
      setScore(score + 1);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let { x, y } = pos;
      if (e.key === 'ArrowUp') y--;
      if (e.key === 'ArrowDown') y++;
      if (e.key === 'ArrowLeft') x--;
      if (e.key === 'ArrowRight') x++;
      handleMove(x, y);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pos, items, score]);

  return (
    <div>
      <div style={{
        width: 320,
        margin: '0 auto',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#222',
        marginBottom: 8,
      }}>
        Score: {score}
      </div>
      <div style={{ position: 'relative', width: 320, height: 288 }}>
        <Map />
        <Player x={pos.x} y={pos.y} />
        {items.map(item => (
          <Item key={item.id} x={item.x} y={item.y} />
        ))}
      </div>
    </div>
  );
}

export default App;
