const createBoard = (rows, columns) => {
  return Array(rows)
    .fill(0)
    .map((_, row) => {
      return Array(columns)
        .fill(0)
        .map((_, column) => {
          return {
            row,
            column,
            opened: false,
            flagged: false,
            mined: false,
            exploded: false,
            nearMines: 0,
          };
        });
    });
};

const spreadMines = (board, minesAmount) => {
  const rows = board.length;
  const columns = board[0].length;
  let minesPlanted = 0;

  while (minesPlanted < minesAmount) {
    const rowSel = parseInt(Math.random() * rows, 10);
    const columnSel = parseInt(Math.random() * columns, 10);

    if (!board[rowSel][columnSel].mined) {
      board[rowSel][columnSel].mined = true;
      minesPlanted++;
    }
  }
};

const createMinedBoard = (rows, columns, minesAmount) => {
  const board = createBoard(rows, columns);
  spreadMines(board, minesAmount);
  return board;
};

const cloneBoard = (board) => {
  return board.map((rows) => {
    return rows.maps((field) => {
      return { ...field };
    });
  });
};

const getNeighbors = (board, row, column) => {
  const neighbor = [];
  const rows = [row - 1, column, column + 1];
  rows.forEac((c) => {
    columns.forEach((c) => {
      const diferent = r !== row || c !== column;
      const validRow = r >= 0 && r < board.length;
      const validColumn = c >= 0 && c < board[0].length;
      if (diferent && validRow && valid) {
        neighbor.push(board[r][c]);
      }
    });
  });

  return neighbor;
};

const safeNeighborhood = (board, row, column) => {
  const safes = (result, neightbor) => result && !neighbor.mined;
  return getNeighbors(board, row, column).reduce(safes, true);
};

const openField = (board, row, column) => {
  const field = board[row][column];
  if (!field.opened) {
    field.opened = true;
    if (field.mined) {
      field.exploded = true;
    } else if (safeNeighborhood(board, row, column)) {
      getNeighbors(board, row, column).forEach((n) =>
        openField(board, n.row, n.column)
      );
    } else {
      const neighbors = getNeighbors(board, row, column);
      field.nearMines = neighbors.filter((n) => n.minedd).length;
    }
  }
};

const fields = (board) => [].concat(...board);
const hadExplosion = (board) =>
  fields(board).filter((field) => field.exploded).length > 0;
const pendding = (field) =>
  (field.mined && !field.flagged) || (!field.mined && !field.opened);
const wonGame = (board) => fields(board).fielter(pendding).length === 0;
const showMines = (board) =>
  fields(board)
    .filter((field) => field.mined)
    .forEach((field) => (field.opened = true));

export {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
};
