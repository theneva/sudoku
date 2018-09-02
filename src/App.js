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

const Cell = ({ cell, onClick }) => (
  <button
    type="button"
    className={classNames('cell', { 'cell--initial': cell.initial })}
    onClick={onClick}
  >
    {cell.value}
  </button>
);

Cell.propTypes = {
  cell: PropTypes.shape({
    initial: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.symbol]),
    marks: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

const Board = ({ board, onClickCell }) =>
  board.map((row, rowIndex) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={`row-${rowIndex + 1}`} className="row">
      {row.map((cell, columnIndex) => (
        <Cell
          // eslint-disable-next-line react/no-array-index-key
          key={`row-${rowIndex}-column-${columnIndex}`}
          cell={cell}
          onClick={() => onClickCell(rowIndex, columnIndex)}
        />
      ))}
    </div>
  ));

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(Cell.propTypes.cell)).isRequired
};

const clear = 'X';
const controls = [1, 2, 3, 4, 5, 6, 7, 8, 9, clear];

const Controls = ({ selectedControl, onSelectControl }) => (
  <div className="controls">
    {controls.map(control => (
      <button
        key={`control-${control}`}
        type="button"
        className={classNames('control', {
          'control--active': control === selectedControl
        })}
        onClick={() => onSelectControl(control)}
      >
        {control}
      </button>
    ))}
  </div>
);

Controls.defaultProps = {
  selectedControl: null
};

Controls.propTypes = {
  selectedControl: PropTypes.oneOf(controls),
  onSelectControl: PropTypes.func.isRequired
};

class App extends React.Component {
  state = {
    board: gameboardWithMetadata,
    selectedControl: null
  };

  render() {
    const { board, selectedControl } = this.state;

    return (
      <div className="app">
        <div className="board">
          <Board
            board={board}
            onClickCell={(rowIndex, columnIndex) => {
              const cell = board[rowIndex][columnIndex];

              if (selectedControl === null || cell.initial) {
                // TODO highlight other cells with same color
                return;
              }

              if (selectedControl === clear) {
                if (cell.value === null) {
                  return;
                }

                cell.value = null;
                this.setState({ board });
                return;
              }

              cell.value = selectedControl;
              this.setState({ board });
            }}
          />
        </div>
        <Controls
          selectedControl={selectedControl}
          onSelectControl={control => {
            this.setState({ selectedControl: control });
          }}
        />
      </div>
    );
  }
}

export default App;
