// Various constants for the game.
const BLOCK_SIZE = 8;
const SCREEN_WIDTH_BLOCKS = 100;
const SCREEN_HEIGHT_BLOCKS = 50;

const Direction = Object.freeze({ // Enums are not supported in JS as a type.
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
});

const BlockTypes = Object.freeze({
  EMPTY: 0,
  EGG: 1,
  HEAD: 2,
  BODY: 3,
  TURN: 4,
  TAIL: 5,
  WALL: 6,
  MAX: 7
});

// The game state.
let assets = Array(BlockTypes.MAX);
let board = null;

// SETUP LOGIC.
function loadAssets() {
  // Load images for the game.
  assets[BlockTypes.EGG] = loadImage('egg.gif');
  assets[BlockTypes.HEAD] = loadImage('head.gif');
  assets[BlockTypes.BODY] = loadImage('body.gif');
  assets[BlockTypes.TURN] = loadImage('turn.gif');
  assets[BlockTypes.TAIL] = loadImage('tail.gif');
  assets[BlockTypes.WALL] = loadImage('./assets/wall.gif');
}

function createBlock(blockType) {
  // No empty - it's just a 0. This is a memory optimization.
  // All other block types are objects on the board.
  return {
    type: blockType,
    deg: 0
  };
}

function createBoard() {
  const board = [];
  
  for (let i = 0; i < SCREEN_HEIGHT_BLOCKS; i++) {
    board.push([]);

    for (let j = 0; j < SCREEN_WIDTH_BLOCKS; j++) {
      board[i].push(0);
    }
  }

  return board;
}

function createWalls (board) {
  for (let i = 0; i < SCREEN_HEIGHT_BLOCKS; i++) {
    for (let j = 0; j < SCREEN_WIDTH_BLOCKS; j++) {
      if (i === 0 || i === SCREEN_HEIGHT_BLOCKS - 1 || j === 0 || j === SCREEN_WIDTH_BLOCKS - 1) {
        board[i][j] = createBlock(BlockTypes.WALL);
      } 
    }
  }

  return board;
}

function createNewSnake() {
  // TODO.
}

function setup() {
  const pixelWidth = SCREEN_WIDTH_BLOCKS * BLOCK_SIZE;
  const pixelHeight = SCREEN_HEIGHT_BLOCKS * BLOCK_SIZE;

  createCanvas(pixelWidth, pixelHeight);
  background(0);

  loadAssets();

  board = createWalls(createBoard()); // All in setup, no surprises.
}

// DRAWING LOGIC.
function drawBlock(asset, x, y) {
  image(asset, x * BLOCK_SIZE, y * BLOCK_SIZE);
}

function drawBoard() {
  for (let i = 0; i < SCREEN_HEIGHT_BLOCKS; i++) {
    for (let j = 0; j < SCREEN_WIDTH_BLOCKS; j++) {
      const block = board[i][j];

      // Empty blocks are not drawn since they are just 0.
      if(!block) {
        continue;
      }

      // Draw actual blocks.
      switch (block.type) {
        case BlockTypes.EGG:
          drawBlock(assets[BlockTypes.EGG], j, i);
          break;
        case BlockTypes.HEAD:
          drawBlock(assets[BlockTypes.HEAD], j, i);
          break;
        case BlockTypes.BODY:
          drawBlock(assets[BlockTypes.BODY], j, i);
          break;
        case BlockTypes.TURN:
          drawBlock(assets[BlockTypes.TURN], j, i);
          break;
        case BlockTypes.TAIL:
          drawBlock(assets[BlockTypes.TAIL], j, i);
          break;
        case BlockTypes.WALL:
          drawBlock(assets[BlockTypes.WALL], j, i);
          break;
      }
    }
  }
}

function draw() {
  drawBoard();
}
