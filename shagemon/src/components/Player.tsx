import React from 'react';

const TILE_SIZE = 32;
const FRAME_COUNT = 4;

type Direction = 'down' | 'left' | 'right' | 'up';

type PlayerProps = {
  x: number;
  y: number;
  frame?: number;
  direction?: Direction;
};

const directionRowMap: Record<Direction, number> = {
  down: 0,
  left: 1,
  right: 2,
  up: 3,
};

export const Player: React.FC<PlayerProps> = ({
  x,
  y,
  frame = 0,
  direction = 'down',
}) => (
  <div
    style={{
      position: 'absolute',
      left: x * TILE_SIZE,
      top: y * TILE_SIZE,
      width: TILE_SIZE,
      height: TILE_SIZE,
      backgroundImage: "url('/sprites/character.png')",
      backgroundPosition: `-${(frame % FRAME_COUNT) * TILE_SIZE}px -${directionRowMap[direction] * TILE_SIZE}px`,
      backgroundSize: `${FRAME_COUNT * TILE_SIZE}px ${4 * TILE_SIZE}px`,
      imageRendering: 'pixelated',
      zIndex: 10,
      transition: 'left 0.1s, top 0.1s',
    }}
  />
);
