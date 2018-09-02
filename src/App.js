import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './App.css';

const clear = Symbol('clear');
const empty = Symbol('empty cell');
const e = empty; // Alias for pretty layout in gameboard
const none = Symbol('nothing selected');

const numberControls = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const controls = [...numberControls, clear];

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
  row.map(cell => ({
    value: cell,
    initial: cell !== empty,
    marks: []
  }))
);

const Cell = ({ cell, onClick, highlightedNumber }) => (
  <button
    type="button"
    className={classNames('cell', {
      'cell--initial': cell.initial,
      'cell--highlighted': highlightedNumber === cell.value
    })}
    onClick={onClick}
  >
    {cell.value === empty ? null : cell.value}
  </button>
);

Cell.defaultProps = {
  highlightedNumber: none
};

Cell.propTypes = {
  cell: PropTypes.shape({
    initial: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.symbol]),
    marks: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  highlightedNumber: PropTypes.oneOf([...numberControls, none])
};

const Board = ({ board, highlightedNumber, onClickCell }) =>
  board.map((row, rowIndex) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={`row-${rowIndex + 1}`} className="row">
      {row.map((cell, columnIndex) => (
        <Cell
          // eslint-disable-next-line react/no-array-index-key
          key={`row-${rowIndex}-column-${columnIndex}`}
          cell={cell}
          highlightedNumber={highlightedNumber}
          onClick={() => onClickCell(rowIndex, columnIndex)}
        />
      ))}
    </div>
  ));

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(Cell.propTypes.cell)).isRequired,
  highlightedNumber: PropTypes.oneOf([...numberControls, none]),
  onClickCell: PropTypes.func.isRequired
};

const Controls = ({ selectedControl, onSelectControl }) => (
  <div className="controls">
    {controls.map(control => (
      <button
        key={`control-${control === clear ? control.toString() : control}`}
        type="button"
        className={classNames('control', {
          'control--active': control === selectedControl
        })}
        onClick={() => onSelectControl(control)}
      >
        {control === clear ? 'X' : control}
      </button>
    ))}
  </div>
);

Controls.defaultProps = {
  selectedControl: none
};

Controls.propTypes = {
  selectedControl: PropTypes.oneOf([...controls, none]),
  onSelectControl: PropTypes.func.isRequired
};

class App extends React.Component {
  state = {
    board: gameboardWithMetadata,
    selectedControl: none,
    highlightedNumber: none
  };

  render() {
    const { board, selectedControl, highlightedNumber } = this.state;

    return (
      <div className="app">
        <div className="board">
          <Board
            board={board}
            highlightedNumber={highlightedNumber}
            onClickCell={(rowIndex, columnIndex) => {
              const cell = board[rowIndex][columnIndex];

              if (selectedControl === none || cell.initial) {
                if (cell.value === empty) {
                  return;
                }

                this.setState({
                  selectedControl: none,
                  highlightedNumber: cell.value
                });

                return;
              }

              if (selectedControl === clear) {
                if (cell.value === empty) {
                  return;
                }

                cell.value = empty;
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
            const isUnselecting = control === selectedControl;

            this.setState({
              selectedControl: isUnselecting ? none : control,
              highlightedNumber:
                isUnselecting || control === clear ? none : control
            });
          }}
        />
      </div>
    );
  }
}

export default App;
