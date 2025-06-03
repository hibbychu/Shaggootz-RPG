import React from 'react';
import { mapData } from '../data/map';

const TILE_SIZE = 32;

export const Map: React.FC = () => (
  <div
    style={{
      position: 'relative',
      width: mapData[0].length * TILE_SIZE,
      height: mapData.length * TILE_SIZE,
      border: '2px solid #222',
      background: '#cde',
    }}
  >
    {mapData.map((row, y) =>
      row.map((tile, x) => (
        <div
          key={`${x}-${y}`}
          style={{
            position: 'absolute',
            left: x * TILE_SIZE,
            top: y * TILE_SIZE,
            width: TILE_SIZE,
            height: TILE_SIZE,
            background: tile === 1 ? '#444' : '#9f6',
            boxSizing: 'border-box',
            border: '1px solid #aaa',
          }}
        />
      ))
    )}
  </div>
);
