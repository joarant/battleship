import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import BoardCell from './BoardCell';

/**
 * Varsinainen pelin pelaaminen taphtuu täällä
 * Piirtää nappuloilla täytetyn ruudukon
 * Pelaajat painavat nappuloita arvataksensa vastustajan alusten paikan
 */
function Play({
  measurements, ships, updateBoardStatus, currentBoard,
}) {
  const board = currentBoard;

  // tuo pelitilan muutoksen parent elementtiin
  const updateBoard = (cell) => {
    board[cell].hit = true;
    updateBoardStatus(board, board[cell]?.shipId);
  };

  return (
    <Grid item xs={12} id="grid">
      {Array(measurements.y).fill(0).map((row, rowIndex) => (
        <Grid container justifyContent="center" spacing={0} key={`${measurements.x + rowIndex} row`}>
          {Array(measurements.x).fill(0).map((value, index) => (
            <Grid key={`${index * rowIndex + index} cell`} item justifyContent="center">
              <BoardCell
                id={measurements.x * rowIndex + index}
                cellId={measurements.x * rowIndex + index}
                setReady={updateBoard}
                isDisabled={board[measurements.x * rowIndex + index].hit}
                ship={board[measurements.x * rowIndex + index].ship}
                fleet={ships}
                shipId={board[measurements.x * rowIndex + index].shipId}
              />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}
export default Play;
