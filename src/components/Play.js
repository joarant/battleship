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
      tempBoard[index] = { hit: false, ship: false };
    }
    Object.values(ships).forEach((ship) => {
      ship.coordinates.forEach((point) => {
        board[point].ship = true;
      });
    });
  }

  const updateBoard = (cell) => {
    tempBoard[cell].hit = true;
    updateBoardStatus(tempBoard);
  };

  return (
    <Grid item xs={12} id="grid">
      {Array(measurements.y).fill(0).map((row, rowIndex) => (
        <Grid container justifyContent="center" spacing={0} key={`${measurements.x + rowIndex} row`}>
          {Array(measurements.x).fill(0).map((value, index) => (
            <Grid key={`${index * rowIndex + index} cell`} item justifyContent="center">
              {console.log(measurements.x, rowIndex, index, measurements.x * rowIndex + index)}
              <BoardCell
                id={measurements.x * rowIndex + index}
                cellId={measurements.x * rowIndex + index}
                setReady={updateBoard}
                isDisabled={tempBoard[measurements.x * rowIndex + index].hit}
                ship
                // ship={tempBoard[measurements.x * rowIndex + index].ship}

              />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}
export default Play;
