import React from 'react';

const TILE_SIZE = 32;

type PlayerProps = {
  x: number;
  y: number;
};

export const Player: React.FC<PlayerProps> = ({ x, y }) => (
  <div
    style={{
      position: 'absolute',
      left: x * TILE_SIZE,
      top: y * TILE_SIZE,
      width: TILE_SIZE,
      height: TILE_SIZE,
      zIndex: 10,
      transition: 'left 0.1s, top 0.1s',
      background: 'url(/trainer.png) 0 0/cover no-repeat', // Replace with your sprite
      // fallback if no sprite:
      backgroundColor: '#f44',
      borderRadius: '50%',
    }}
  />
);
