import React, { useEffect } from 'react';
import {
  Grid, Paper, Button,
} from '@material-ui/core';
import Ship from './Ship';

function GameBoard(info) {
  const boardA = [];

  for (let index = 0; index < 8; index += 1) {
    boardA.push([]);
    for (let a = 0; a < 8; a += 1) {
      boardA[index].push(`${index}${a}`);
    }
  }
  useEffect(() => {
    // code to run after render goes here
    const myPics = document.getElementById('gridi');
    myPics.addEventListener('mouseup', (e) => {
      const grid = e.target;
      console.log(grid);
    });
  }, []);

  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const drop = (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));
  };

  return (
    <>
      <Ship aax="dadsa" />
      <Ship aax="da2dsa" />

      <Grid item xs={12} id="gridi">

        {boardA.map((row) => (
          <Grid container justifyContent="center" spacing={0}>
            {row.map((value) => (
              <Grid key={value} item justifyContent="center">
                <Paper
                  sx={{
                    height: 100,
                    width: 100,
                    // opacity: 0.5,
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#ffffff'),
                  }}
                  style={{ alignContent: 'center' }}
                  variant="outlined"
                  onDrop={drop}
                  onDragOver={allowDrop}
                >
                  {/* <Ship aax={value} /> */}
                </Paper>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
export default GameBoard;
