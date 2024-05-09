// Various constants for the game.
const BLOCK_SIZE = 8;
const SCREEN_WIDTH_BLOCKS = 100;
const SCREEN_HEIGHT_BLOCKS = 50;
const FOOD_WAIT_INC = 5;

const Direction = Object.freeze({ // Enums are not supported in JS as a type.
  KEEP: 0,
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4
});

const BlockTypes = Object.freeze({
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
let snake = null;

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
    deg: 0,
    dir: Direction.KEEP
  };
}

function createBoard() {
  // i represents the rows, j represents the columns.
  // i runs from top to bottom, j runs from left to right.
  // 0,0 is the top left corner.
  // +--> j
  // |
  // |
  // v i

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

function createBodyPart() {
  return {
    x: 0,
    y: 0,
    dir: Direction.RIGHT,
    nextDir: Direction.KEEP
  };
}

function createNewSnake() {
  return {
    head: createBodyPart(),
    tail: createBodyPart(),
    wait: 5 // Incremented whenever the snake eats an egg.
  }
};

function setup() {
  const pixelWidth = SCREEN_WIDTH_BLOCKS * BLOCK_SIZE;
  const pixelHeight = SCREEN_HEIGHT_BLOCKS * BLOCK_SIZE;

  createCanvas(pixelWidth, pixelHeight);
  background(0);

  loadAssets();

  board = createWalls(createBoard()); // All in setup, no surprises.
  snake = createNewSnake();
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

function moveSnake() {

}

function checkInput() {

}

function draw() {
  // This is the game loop.
  // Snake must be moved before drawing the board.
  moveSnake();
  checkInput();
  drawBoard();
}
