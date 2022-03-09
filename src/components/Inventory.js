import React from 'react';
import {
  Grid, Paper,
} from '@material-ui/core';

function Invetory() {
  const boardA = [];

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
            <Grid key={value} item>
              <Paper
                sx={{
                  height: 100,
                  width: 100,
                  backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
                }}
              />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}
export default Invetory;
