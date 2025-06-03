import React from 'react';

const TILE_SIZE = 32;

type ItemProps = {
  x: number;
  y: number;
};

export const Item: React.FC<ItemProps> = ({ x, y }) => (
  <div
    style={{
      position: 'absolute',
      left: x * TILE_SIZE + 8,
      top: y * TILE_SIZE + 8,
      width: 16,
      height: 16,
      background: 'gold',
      borderRadius: '50%',
      border: '2px solid orange',
      zIndex: 5,
    }}
  />
);
