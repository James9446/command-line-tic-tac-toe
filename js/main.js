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
// positions[0] = 'X'
// let board = 
// ' ' + positions[0] + ' | ' + positions[1] + ' | ' + positions[2] + ' \n' +
// '---+---+---\n' +
// ' ' + positions[3] + ' | ' + positions[4] + ' | ' + positions[5] + ' \n' +
// '---+---+---\n' +
// ' ' + positions[6] + ' | ' + positions[7] + ' | ' + positions[8] + ' \n';

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
  
 
  
  // Get two properties from the user: email, password 
  // prompt.get(schema, function (err, result) {
  //   // 
  //   // Log the results. 
  //   // 
  //   // console.log('Command-line input received:');
  //   // console.log(typeof result.move)
  //   console.log('  player selected: ' + namePosition(result.move));
  //   positions[result.move.toString()] = 'X';
    
  //   console.log(createBoard(positions));
  // });
prompt.start();

const playGame = (playerTurn, moves) => {
  prompt.get(schema, function (err, result) {
    if (isValidMove(result.move, moves)) {
      console.log('  player ' + playerTurn + ' selected: ' + namePosition(result.move));
      moves[result.move.toString()] = playerTurn;
      console.log(createBoard(moves));
      if (checkForWin(moves, playerTurn)) {
        console.log(playerTurn + ' has won!')
      } else {
        if (playerTurn === 'X') {
          playerTurn = 'O'
        } else {
          playerTurn = 'X'
        }
        playGame(playerTurn, moves)
      }
    } else {
      console.log('That position has already been taken');
      playGame(playerTurn, moves);
    }
  });
}
playGame('X', positions)
  