import React, { useEffect, useState } from 'react';
import {
  Grid, Paper, Button,
} from '@material-ui/core';
import BoardCell from './BoardCell';

function Play({
  measurements, ships, updateBoardStatus, currentBoard,
}) {
  const [board, setBoard] = useState(currentBoard);

  // Forms cells
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
              />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}
export default Play;
