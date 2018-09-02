import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './App.css';

const e = Symbol('empty');

const gameboard = [
  [e, 2, 8, 3, 6, 1, 7, 9, 5],
  [7, e, 5, 2, e, 4, e, 3, e],
  [6, 3, e, e, 7, e, e, e, 8],
  [8, 5, 2, e, e, 7, 3, e, 9],
  [3, 7, e, 9, 2, 5, e, 1, 6],
  [e, 1, e, e, 3, 8, e, 7, 2],
  [e, 8, 7, 1, 9, 3, 2, 6, e],
  [2, 4, 9, 7, 5, 6, 1, 8, 3],
  [e, e, e, 8, 4, 2, 9, 5, 7]
];

const gameboardWithMetadata = gameboard.map(row =>
  row.map(cell => {
    if (cell === e) {
      return {
        value: null,
        initial: false,
        marks: []
      };
    }

    return {
      value: cell,
      initial: true,
      marks: []
    };
  })
);

const Cell = ({ cell }) => (
  <div className={classNames('cell', { 'cell--initial': cell.initial })}>
    {cell.value}
  </div>
);

Cell.propTypes = {
  cell: PropTypes.shape({
    initial: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.symbol]),
    marks: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired
};

const Board = ({ board }) =>
  board.map((row, rowIndex) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={`row-${rowIndex + 1}`} className="row">
      {row.map((cell, columnIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <Cell key={`row-${rowIndex}-column-${columnIndex}`} cell={cell} />
      ))}
    </div>
  ));

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(Cell.propTypes.cell)).isRequired
};

const App = () => (
  <div className="board">
    <Board board={gameboardWithMetadata} />
  </div>
);

export default App;
