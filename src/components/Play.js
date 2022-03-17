import React, { useEffect, useState } from 'react';
import {
  Grid, Paper, Button,
} from '@material-ui/core';

function Play({ measurements, ships }) {
  const boardA = [];
  console.log(measurements);

  for (let index = 0; index < measurements.x; index += 1) {
    boardA.push([]);
    for (let a = 0; a < measurements.y; a += 1) {
      boardA[index].push(index * 8 + a);
    }
  }

  return (
    <Grid item xs={12} id="grid">
      {boardA.map((row) => (
        <Grid container justifyContent="center" spacing={0} key={row}>
          {row.map((value) => (
            <Grid key={value} item justifyContent="center">
              <Button
                id={value}
                sx={{
                  height: 80,
                  width: 80,
                  backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#ffffff'),
                }}
                style={{ alignContent: 'center' }}
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}
export default Play;
