// src/data/maps.ts
export const outsideMap = {
  name: 'Outside',
  tiles: [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,2,1],
  [1,0,1,1,0,1,1,0,0,1],
  [1,0,0,1,0,2,1,0,0,1],
  [1,1,0,0,0,1,0,0,1,1],
  [1,0,0,1,0,0,0,1,0,1],
  [1,0,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,1], // Door to cave at x=4, y=7
  [1,1,1,1,1,2,1,1,1,1], // Door to forest at x=5, y=8
  [1,1,1,1,1,1,1,1,1,1],
  ],
  doors: [
    // Existing door to inside
    {
      id: 'outside-door-inside',
      x: 8,
      y: 1,
      targetMap: 'inside',
      targetX: 1,
      targetY: 1,
    },
    // New door to cave (add at x=4, y=7)
    {
      id: 'outside-door-cave',
      x: 5,
      y: 3,
      targetMap: 'cave',
      targetX: 1,
      targetY: 1,
    },
    // New door to forest (add at x=5, y=8)
    {
      id: 'outside-door-forest',
      x: 5,
      y: 8,
      targetMap: 'forest',
      targetX: 2,
      targetY: 1,
    }
  ],
  items: [
    { id: 'apple', x: 1, y: 2 },
    { id: 'banana', x: 4, y: 6 }
  ]
};

export const insideMap = {
  name: 'Inside House',
  tiles: [
    [1,1,1,1,1],
    [2,0,0,0,1],
    [1,1,1,1,1],
  ],
  doors: [
    {
      id: 'inside-door',
      x: 0,
      y: 1,
      targetMap: 'outside',
      targetX: 8,
      targetY: 1,
    }
  ],
  items: []
};

export const forestMap = {
  name: 'Forest',
  tiles: [
    [1,1,1,1,1],
    [1,0,0,2,1], // Door at x=3, y=1 (already exists)
    [1,0,1,0,1],
    [1,0,3,0,1],
    [1,1,1,1,1],
  ],
  doors: [
    {
      id: 'forest-door',
      x: 3,
      y: 1,
      targetMap: 'outside',
      targetX: 5, // Return to x=5, y=8 on outsideMap
      targetY: 8,
    },
    {
      id: 'game-end',
      x: 2,
      y: 3,
      targetMap: '', // or null if you prefer
      targetX: 0,
      targetY: 0,
    }
  ],
  items: []
};

export const caveMap = {
  name: 'Cave',
  tiles: [
    [1,1,1,1,1],
    [1,2,0,0,1], // Door at x=1, y=1 (already exists)
    [1,1,1,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
  ],
  doors: [
    {
      id: 'cave-door',
      x: 1,
      y: 1,
      targetMap: 'outside',
      targetX: 5, // Return to x=4, y=7 on outsideMap
      targetY: 3,
    }
  ],
  items: []
};

export const maps = {
  outside: outsideMap,
  inside: insideMap,
  forest: forestMap,
  cave: caveMap,
};
