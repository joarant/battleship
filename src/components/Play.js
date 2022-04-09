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

  // Luo ruudut
  const tempBoard = currentBoard;
  if (Object.keys(tempBoard).length === 0) {
    for (let index = 0; index < measurements.x * measurements.y; index += 1) {
      tempBoard[index] = { hit: false, ship: false, shipId: null };
    }
    Object.entries(ships).forEach((ship) => {
      ship[1].coordinates.forEach((point) => {
        board[point].ship = true;
        // eslint-disable-next-line prefer-destructuring
        board[point].shipId = ship[0];
      });
    });
  }

  // tuo pelitilan muutoksen parent elementtiin
  const updateBoard = (cell) => {
    tempBoard[cell].hit = true;
    updateBoardStatus(tempBoard, tempBoard[cell]?.shipId);
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
                isDisabled={tempBoard[measurements.x * rowIndex + index].hit}
                ship={tempBoard[measurements.x * rowIndex + index].ship}
                fleet={ships}
                shipId={tempBoard[measurements.x * rowIndex + index].shipId}
              />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}
export default Play;
