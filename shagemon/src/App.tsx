import React, { useState, useEffect } from 'react';
import { maps } from './data/maps';
import { Map } from './components/Map';
import { Player } from './components/Player';

type MapKey = keyof typeof maps; // Automatically gets all map keys (e.g., 'outside', 'inside', 'forest')

const START_POS = { x: 1, y: 1 };

function App() {
  const [currentMapKey, setCurrentMapKey] = useState<MapKey>('outside');
  const [pos, setPos] = useState(START_POS);
  const [score, setScore] = useState(0);

  // Check if a tile is walkable (0 or door tile 2)
  function isWalkable(x: number, y: number) {
    const map = maps[currentMapKey];
    return map.tiles[y]?.[x] !== 1; // Allow walking on 0 (walkable) and 2 (door)
  }

  function handleMove(newX: number, newY: number) {
    if (!isWalkable(newX, newY)) return;

    setPos({ x: newX, y: newY });

    // Check for door
    const door = maps[currentMapKey].doors.find(d => d.x === newX && d.y === newY);
    if (door) {
      setCurrentMapKey(door.targetMap as MapKey); // Use MapKey type here
      setPos({ x: door.targetX, y: door.targetY });
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
  }, [pos, currentMapKey]); // Add currentMapKey to dependencies

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
        <div>Coordinates: X: {pos.x}, Y: {pos.y}</div>
        <div>Score: {score}</div>
      </div>
      <div style={{ position: 'relative', width: 320, height: 288 }}>
        <Map map={maps[currentMapKey]} />
        <Player x={pos.x} y={pos.y} />
      </div>
    </div>
  );
}

export default App;
