import React from 'react';

interface MapProps {
  map: {
    tiles: number[][];
    // doors?: Array<{ x: number; y: number }>; // if you want to use doors here
  };
}

const TILE_SIZE = 32;

export const Map: React.FC<MapProps> = ({ map }) => (
  <div
    style={{
      position: 'relative',
      width: map.tiles[0].length * TILE_SIZE,
      height: map.tiles.length * TILE_SIZE,
      border: '2px solid #222',
      background: '#cde',
    }}
  >
    {map.tiles.map((row: number[], y: number) =>
      row.map((tile: number, x: number) => (
        <div
          key={`${x}-${y}`}
          style={{
            position: 'absolute',
            left: x * TILE_SIZE,
            top: y * TILE_SIZE,
            width: TILE_SIZE,
            height: TILE_SIZE,
            background: tile === 1 ? '#444' : tile === 2 ? '#aaf' : tile === 3 ? '#e5f' : '#9f6',
            boxSizing: 'border-box',
            border: '1px solid #aaa',
          }}
        />
      ))
    )}
  </div>
);
