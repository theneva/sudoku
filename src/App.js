import React from 'react';
import PropTypes from 'prop-types';
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

const Cell = ({ value }) => (
  <div className="cell">{value === e ? null : value}</div>
);

Cell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.symbol]).isRequired
};

const Grid = ({ board }) =>
  board.map((row, rowIndex) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={`row-${rowIndex + 1}`} className="row">
      {row.map((cell, columnIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <Cell key={`row-${rowIndex}-column-${columnIndex}`} value={cell} />
      ))}
    </div>
  ));

Grid.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(Cell.propTypes.value)).isRequired
};

const App = () => (
  <div className="board">
    <Grid board={gameboard} />
  </div>
);

export default App;
