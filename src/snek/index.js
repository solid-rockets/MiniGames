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

// SETUP LOGIC.
function loadAssets() {
  // Load images for the game.
  // NOTE: copilot suggested all of these lines.
  // assets[BlockTypes.EMPTY] = loadImage('empty.gif');
  // assets[BlockTypes.EGG] = loadImage('egg.gif');
  // assets[BlockTypes.HEAD] = loadImage('head.gif');
  // assets[BlockTypes.BODY] = loadImage('body.gif');
  // assets[BlockTypes.TURN] = loadImage('turn.gif');
  // assets[BlockTypes.TAIL] = loadImage('tail.gif');
  assets[BlockTypes.WALL] = loadImage('./assets/wall.gif');
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

function createNewSnake() {

}

function setup() {
  const pixelWidth = SCREEN_WIDTH_BLOCKS * BLOCK_SIZE;
  const pixelHeight = SCREEN_HEIGHT_BLOCKS * BLOCK_SIZE;
  createCanvas(pixelWidth, pixelHeight);
  background(0);

  loadAssets();
}

// DRAWING LOGIC.
function drawWalls() {
  for (let i = 0; i < SCREEN_HEIGHT_BLOCKS; i++) {
    for (let j = 0; j < SCREEN_WIDTH_BLOCKS; j++) {
      if (i === 0 || i === SCREEN_HEIGHT_BLOCKS - 1 || j === 0 || j === SCREEN_WIDTH_BLOCKS - 1) {
        image(assets[BlockTypes.WALL], j * BLOCK_SIZE, i * BLOCK_SIZE);
      } 
    }
  }
}


function draw() {
  drawWalls();
}
