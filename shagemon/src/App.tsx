import React, { useState, useEffect } from 'react';
import { maps } from './data/maps';
import { Map } from './components/Map';
import { Player } from './components/Player';
import { Item } from './components/Item';

type MapKey = keyof typeof maps;
type Direction = 'down' | 'left' | 'right' | 'up';

const START_POS = { x: 1, y: 1 };

function App() {
  const [currentMapKey, setCurrentMapKey] = useState<MapKey>('outside');
  const [pos, setPos] = useState(START_POS);
  const [score, setScore] = useState(0);
  const [frame, setFrame] = useState<number>(0);
  const [direction, setDirection] = useState<Direction>('down');
  const [items, setItems] = useState(
    maps['outside'].items ? [...maps['outside'].items] : []
  );
  const [gameOver, setGameOver] = useState(false);

  // Update items when changing maps
  // useEffect(() => {
  //   setItems(maps[currentMapKey]?.items ?? []);
  // }, [currentMapKey]);

  function isWalkable(x: number, y: number) {
    const map = maps[currentMapKey];
    return map.tiles[y]?.[x] !== 1;
  }

  function handleMove(newX: number, newY: number, moveDirection: Direction) {
    if (!isWalkable(newX, newY)) return;

    setPos({ x: newX, y: newY });
    setDirection(moveDirection);
    setFrame((prev: number) => (prev + 1) % 4);

    // Check for item at new position
    const foundItem = items.find(item => item.x === newX && item.y === newY);
    if (foundItem) {
      setItems(items.filter(item => item.id !== foundItem.id));
      setScore(score + 1);
    }

    // Check for door
    const door = maps[currentMapKey].doors.find(d => d.x === newX && d.y === newY);
    if (door) {
      if (door.id === 'game-end') {
        setGameOver(true);
        return;
      }
      setCurrentMapKey(door.targetMap as MapKey);
      setPos({ x: door.targetX, y: door.targetY });
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let { x, y } = pos;
      let moveDirection: Direction = direction;

      if (e.key === 'ArrowUp') { y--; moveDirection = 'up'; }
      else if (e.key === 'ArrowDown') { y++; moveDirection = 'down'; }
      else if (e.key === 'ArrowLeft') { x--; moveDirection = 'left'; }
      else if (e.key === 'ArrowRight') { x++; moveDirection = 'right'; }
      else return;

      handleMove(x, y, moveDirection);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pos, currentMapKey, direction, items, score]);

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
        <div>Room: {maps[currentMapKey].name}</div>
        <div>Coordinates: X: {pos.x}, Y: {pos.y}</div>
        <div>Score: {score}</div>
      </div>
      <div style={{ position: 'relative', width: 320, height: 288 }}>
        <Map map={maps[currentMapKey]} />
        {items.map(item => (
          <Item key={item.id} x={item.x} y={item.y} />
        ))}
        <Player x={pos.x} y={pos.y} frame={frame} direction={direction} />
      </div>
      {gameOver && (
        <div style={{
          position: 'fixed',
          left: 0, top: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white', padding: 32, borderRadius: 16, textAlign: 'center'
          }}>
            <h2>Game Over</h2>
            <p>Congratulations! You reached the end.</p>
            <button onClick={() => window.location.reload()}>Restart</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
