/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import {
  Button, Box, Typography, Grid, Paper,
} from '@material-ui/core';

const BoardStatus = ({
  measurements, fleet, board, boardOwner, showShipPositions,
}) => {
  const getColor = (cellStatus) => {
    if (cellStatus) {
      if (cellStatus.ship && !cellStatus.hit && showShipPositions) {
        return 'green';
      }
      if (cellStatus.ship && cellStatus.hit) {
        return 'red';
      }
      if (!cellStatus.ship && cellStatus.hit) {
        console.log('grey');
        return '#808080';
      }
    }

    return 'white';
  };

  return (

    <>
      {board && (
      <>
        <Typography>
          {`${boardOwner} 
         \n current board`}
        </Typography>
        <Grid item xs={12}>
          {Array(measurements.y).fill(0).map((row, rowIndex) => (
            <Grid container justifyContent="center" spacing={0} key={`${measurements.x + rowIndex} row`}>
              {Array(measurements.x).fill(0).map((value, index) => (
                <Grid key={`${index * rowIndex + index} cell`} item justifyContent="center">
                  <Paper
                    sx={{
                      height: 30,
                      width: 30,
                      backgroundColor: getColor(board[measurements.x * rowIndex + index]),
                    }}
                    style={{ alignContent: 'center' }}
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </>
      )}

    </>
  );
};

export default BoardStatus;
