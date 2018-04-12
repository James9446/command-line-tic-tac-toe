var prompt = require('prompt');
let board0 = 
  ' 1 | 2 | 3 \n' +
  '---+---+---\n' +
  ' 4 | 5 | 6 \n' +
  '---+---+---\n' +
  ' 7 | 8 | 9 \n';

let board1 = 
  '   |   |   \n' +
  '---+---+---\n' +
  '   |   |   \n' +
  '---+---+---\n' +
  '   |   |   \n';

// game intro 
console.log(
  '\n' +
  'It\'s time to play tic-tac-toe! \n\n' +
  'Imagine the board looks like this: \n\n' + 
  board0 + 
  '\n' +
  'Choose your move based on the numerical position \n\n' +
  'It\'s X\'s turn to go first \n\n' +
  board1
);

let positions = {
  1: ' ',
  2: ' ',
  3: ' ',
  4: ' ',
  5: ' ',
  6: ' ',
  7: ' ',
  8: ' ',
  9: ' '
}

const createBoard = (moves) => {
  let board = 
    ' ' + moves[1] + ' | ' + moves[2] + ' | ' + moves[3] + ' \n' +
    '---+---+---\n' +
    ' ' + moves[4] + ' | ' + moves[5] + ' | ' + moves[6] + ' \n' +
    '---+---+---\n' +
    ' ' + moves[7] + ' | ' + moves[8] + ' | ' + moves[9] + ' \n';
  return board;
};

const isValidMove = (move, moves) => { 
  if (moves[move] === ' ') {
    return true;
  }
  return false;
}

checkForWin = (moves, player) => {
  let winConditions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
  for (let i = 0; i < winConditions.length; i++) {
    if (moves[winConditions[i][0]] === player && moves[winConditions[i][1]] === player && moves[winConditions[i][2]] === player) {
      return true;
    }
  }
  return false;
}

checkForCatsGame = (moves) => {
  for (let key in moves) {
    if (moves[key] === ' ') 
    return false;
  }
  return true;
}

const namePosition = (num) => {
  let position = '';
  if (num <= '3') {
    position += 'Top, ';
  } else if (num <= '6') {
    position += 'Middle, ';
  } else if (num <= '9') {
    position += 'Bottom, ';
  }
  if (num === '1' || num === '4' || num === '7') {
    position += 'Left';
  } else if (num === '2' || num === '5' || num === '8') {
    position += 'Center';
  } else if (num === '3' || num === '6' || num === '9') {
    position += 'Right';
  }
  return position;
}

var schema = {
    properties: {
      move: {
        pattern: /^[1-9]$/,
        message: 'Your move must be a number between 1 and 9',
        required: true
      }
    }
  };
  
prompt.start();

const playGame = (playerTurn, moves) => {
  prompt.get(schema, function (err, result) {
    if (isValidMove(result.move, moves)) {
      console.log('\n' + playerTurn + ' selected: ' + namePosition(result.move) + '\n');
      moves[result.move.toString()] = playerTurn;
      console.log(createBoard(moves));
      if (checkForWin(moves, playerTurn)) {
        console.log(playerTurn + ' has won!\n')
      } else if (checkForCatsGame(moves)) {
        console.log('Cats game!')
      } else {
        if (playerTurn === 'X') {
          playerTurn = 'O'
        } else {
          playerTurn = 'X'
        }
        console.log('  It\'s ' + playerTurn + '\'s turn\n' )
        playGame(playerTurn, moves)
      }
    } else {
      console.log('\nThat position has already been taken');
      console.log('  It\'s still ' + playerTurn + '\'s turn' )
      playGame(playerTurn, moves);
    }
  });
}
playGame('X', positions)
  