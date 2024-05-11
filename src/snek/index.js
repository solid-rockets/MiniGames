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
let gameOver = false;

// SETUP LOGIC.
function loadAssets() {
  // Load images for the game.
  assets[BlockTypes.EGG] = loadImage('./assets/egg.gif');
  assets[BlockTypes.HEAD] = loadImage('./assets/head.gif');
  assets[BlockTypes.BODY] = loadImage('./assets/body.gif');
  assets[BlockTypes.TURN] = loadImage('./assets/turn.gif');
  assets[BlockTypes.TAIL] = loadImage('./assets/tail.gif');
  assets[BlockTypes.WALL] = loadImage('./assets/wall.gif');
}

function createBlock(blockType) {
  // No empty - it's just a 0. This is a memory optimization.
  // All other block types are objects on the board.
  // The dir is the direction the tail is supposed to travel,
  // plus it plays a role in orienting the turn/body blocks.
  return {
    type: blockType,
    deg: 0,
    dir: undefined // Will get a val from enum; TS would help here.
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
    x: 20,
    y: 20,
    dir: Direction.UP,
    nextDir: Direction.UP,
  };
}

function createNewSnake() {
  const snake = {
    head: createBodyPart(),
    tail: createBodyPart(),
    wait: 3 // Incremented whenever the snake eats an egg.
  };

  snake.tail.y = snake.head.y + 1; // TODO: any direction

  return snake;
};

function setup() {
  const pixelWidth = SCREEN_WIDTH_BLOCKS * BLOCK_SIZE;
  const pixelHeight = SCREEN_HEIGHT_BLOCKS * BLOCK_SIZE;

  createCanvas(pixelWidth, pixelHeight);
  background(0);

  loadAssets();

  board = createWalls(createBoard()); // All in setup, no surprises.
  snake = createNewSnake();

  frameRate(5);
}

// DRAWING LOGIC.
function drawBlock(asset, x, y) {
  // NOTE: this is good enough for now, but
  // I'll need to rotate the blocks for the turns and body.
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
        case BlockTypes.BODY:
          drawBlock(assets[BlockTypes.BODY], j, i);
          break;
        case BlockTypes.TURN:
          drawBlock(assets[BlockTypes.TURN], j, i);
          break;
        case BlockTypes.WALL:
          drawBlock(assets[BlockTypes.WALL], j, i);
          break;
      }
    }
  }
}

function incPosBodyPart(part) {
  switch (part.dir) {
    case Direction.UP:
      part.y--;
      break;
    case Direction.DOWN:
      part.y++;
      break;
    case Direction.LEFT:
      part.x--;
      break;
    case Direction.RIGHT:
      part.x++;
      break;
  }
}

function createBodyUnderHead() {
  // Decide based on current and next directions.
  const bodyBlock = snake.head.dir === snake.head.nextDir ? 
    createBlock(BlockTypes.BODY) : 
    createBlock(BlockTypes.TURN);

  bodyBlock.dir = snake.head.dir;

  board[snake.head.y][snake.head.x] = bodyBlock;
}

function clearBlockAtBodyPartPos(part) {
  board[part.y][part.x] = 0;
}

function getNextDirForTail() {
  const nextBlock = board[snake.tail.y][snake.tail.x];

  if (!nextBlock) {
    return;
  }

  snake.tail.dir = nextBlock.dir;
  clearBlockAtBodyPartPos(snake.tail);
}

function moveSnake() {
  // Move the head.
  // The idea is to create a body block under the head before it moves.
  createBodyUnderHead();
  incPosBodyPart(snake.head);
  snake.head.dir = snake.head.nextDir;

  // Move the tail.
  if(snake.wait == 0) {
    incPosBodyPart(snake.tail);
    getNextDirForTail();
    snake.tail.dir = snake.tail.nextDir;
  } else {
    snake.wait--;
  }

  // Check for wall collisions.
  if (board[snake.head.y][snake.head.x].type === BlockTypes.WALL) {
    gameOver = true;
  }

  // Check for self collisions.

  // Check for egg collisions.
}

function checkInput() {
  // TODO.
}

function drawHead() {
  drawBlock(assets[BlockTypes.HEAD], snake.head.x, snake.head.y);
}

function drawTail() {
  drawBlock(assets[BlockTypes.TAIL], snake.tail.x, snake.tail.y);
}

function draw() {
  // This is the game loop.
  // Snake must be moved before drawing the board.
  if (gameOver) {
    console.log('Game over!');
    return; // TODO: try again?
  }

  checkInput();

  moveSnake();

  background(0);
  drawBoard();
  drawTail();
  drawHead();
}
