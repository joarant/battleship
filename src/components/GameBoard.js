import React, { useEffect, useState } from 'react';
import {
  Grid, Paper, Button,
} from '@material-ui/core';
import Ship from './Ship';

// https://www.w3schools.com/howto/howto_js_draggable.asp
// https://stackoverflow.com/questions/1009753/pass-mouse-events-through-absolutely-positione-elementd
function GameBoard(info) {
  const boardA = [];
  const CARRIER = { type: 'CARRIER', hitpoints: 5, coordinates: [] };
  const PATROL_BOAT = { type: 'PATROL_BOAT', hitpoints: 2, coordinates: [] };

  // ship
  // id: { type: '', hitpoints: null, coordinates: [] };
  const ships = { id1: CARRIER, id2: PATROL_BOAT };

  const addInfoToBoardObject = (newObject, shipId) => {
    ships[shipId] = newObject;
    console.log(ships);
  };

  const changeMovedObject = (shipId) => {
    window.addEventListener('mouseup', (e) => {
      const draggable = document.getElementById(shipId);
      const rect = e.target.getBoundingClientRect();
      draggable.style.left = `${rect.x}px`;
      draggable.style.top = `${rect.y}px`;
      addInfoToBoardObject({ ...ships[shipId], ...{ coordinates: [e.target.id] } }, shipId);
    }, { once: true });

    const ship = document.getElementById(shipId);
    window.addEventListener('keyup', (e) => {
      if (ship.style.transform === 'rotate(270deg)') {
        ship.style.transform = 'rotate(360deg)';
      } else {
        ship.style.transform = 'rotate(270deg)';
      }
    });
  };

  // console.log(info.info, info.info.y);
  const x = parseInt(info.info.x, 10);
  const y = parseInt(info.info.y, 10);
  // console.log(x, y);

  for (let index = 0; index < 8; index += 1) {
    boardA.push([]);
    for (let a = 0; a < 8; a += 1) {
      boardA[index].push(index * 8 + a);
      // console.log('index:', index, 'value:', index * 8 + a);
    }
  }

  return (
    <>
      <Ship imgId="id1" beingMoved={changeMovedObject} />
      <Ship imgId="id2" beingMoved={changeMovedObject} />

      <Grid item xs={12} id="grid">

        {boardA.map((row) => (
          <Grid container justifyContent="center" spacing={0} key={row}>
            {row.map((value) => (
              <Grid key={value} item justifyContent="center">
                <Paper
                  id={value}
                  sx={{
                    height: 80,
                    width: 80,
                    // opacity: 0.5,
                    backgroundColor: (theme) => ('#ffffff'),
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
  );
}
export default GameBoard;
