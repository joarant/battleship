import React from 'react';
import {
  Grid, Paper, Button,
} from '@material-ui/core';

// <img src="your.svg#svgView(preserveAspectRatio(none))" />
function GameBoard() {
  const boardA = [];
  const boardB = [];

  for (let index = 0; index < 8; index += 1) {
    boardA.push([]);
    for (let a = 0; a < 8; a += 1) {
      boardA[index].push(`${index}${a}`);
    }
  }

  return (
    <Grid item xs={12}>

      {boardA.map((row) => (
        <Grid container justifyContent="center" spacing={0}>
          {row.map((value) => (
            <Grid key={value} item justifyContent="center">
              <Grid
                sx={{
                  height: 100,
                  width: 100,
                  opacity: 0.5,
                  backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#ffffff'),
                }}
              >
                <img
                  src="images/arrow.svg"
                  alt=""
                  // width={100}
                  // height=
                  style={{ height: '100%', width: '300%' }}

                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}
export default GameBoard;
