import React, { useEffect, useState } from 'react';
import {
  Grid, Paper, Button,
} from '@material-ui/core';
import Ship from './Ship';

// https://www.w3schools.com/howto/howto_js_draggable.asp
// https://stackoverflow.com/questions/1009753/pass-mouse-events-through-absolutely-positione-elementd
function SetPieces(info) {
  const board = [];
  const board2 = [];

  const CARRIER = { type: 'CARRIER', hitpoints: 5, coordinates: [] };
  const PATROL_BOAT = { type: 'PATROL_BOAT', hitpoints: 2, coordinates: [] };

  // ship
  // id: { type: '', hitpoints: null, coordinates: [] };
  const ships = { id1: CARRIER, id2: PATROL_BOAT };

  const addInfoToBoardObject = (newObject, shipId) => {
    ships[shipId] = newObject;
    // console.log(ships);
  };

  const checkIfMoveIsLegal = (shipSize, shipOrientation, targetCell) => {
    // math.floor(target.id / rivin pituus) = sama kaikilla jotka ovat samassa rivissä
    // mod(target.id/ rivin pituus) on sama kaikilla jotka ovat samassa pystyrivissä
    if (shipOrientation) {
      const refrenceNum = Math.floor(parseInt(targetCell.id, 10) / 8);
      for (let index = 0; index < shipSize; index += 1) {
        const nextCell = document.getElementById(parseInt(targetCell.id, 10) + index);
        if (nextCell === null) {
          return false;
        }
        if (!(Math.floor(parseInt(nextCell.id, 10) / 8) === refrenceNum)) {
          console.log('laiton');
          return false;
        }
      }
    } else {
      const refrenceNum = parseInt(targetCell.id, 10) % 8;
      for (let index = 0; index < shipSize; index += 1) {
        const nextCell = document.getElementById(parseInt(targetCell.id, 10) + index * 8);
        if (nextCell === null) {
          return false;
        }

        if (!(parseInt(nextCell.id, 10) % 8 === refrenceNum)) {
          console.log('laiton');
          return false;
        }
      }
    }
    return true;
  };

  const changeMovedObject = (shipId, initialPosition, objectGrabbedCell) => {
    window.addEventListener('mouseup', (e) => {
      const draggable = document.getElementById(shipId);
      const correctCell = document.getElementById(
        (parseInt(e.target.id, 10) - objectGrabbedCell).toString(),
      );

      if (board.findIndex((element) => element === correctCell?.id) !== -1
      && checkIfMoveIsLegal(5, false, correctCell)) {
        // const correctCell = document.getElementById(
        //   (parseInt(e.target.id, 10) - objectGrabbedCell).toString(),
        // );
        console.log(checkIfMoveIsLegal(5, false, correctCell));
        const rect = correctCell.getBoundingClientRect();
        draggable.style.left = `${rect.x}px`;
        draggable.style.top = `${rect.y}px`;
        const coordinateArray = [];
        for (let index = parseInt(e.target.id, 10) - objectGrabbedCell;
          index < parseInt(e.target.id, 10) - objectGrabbedCell + ships[shipId].hitpoints;
          index += 1) {
          coordinateArray.push(index.toString());
        }
        addInfoToBoardObject({ ...ships[shipId], ...{ coordinates: coordinateArray } }, shipId);
      } else {
        draggable.style.left = `${initialPosition.x}px`;
        draggable.style.top = `${initialPosition.y}px`;
      }
    }, { once: true });
  };

  // console.log(info.info, info.info.y);
  const x = parseInt(info.info.x, 10);
  const y = parseInt(info.info.y, 10);
  // console.log(x, y);

  for (let index = 0; index < 8; index += 1) {
    for (let a = 0; a < 8; a += 1) {
      board.push((index * 8 + a).toString());
    }
  }

  return (
    <>
      <Ship imgId="id1" beingMoved={changeMovedObject} size={2} />
      <Ship imgId="id2" beingMoved={changeMovedObject} size={2} />

      <Grid item xs={12} id="grid">

        {Array(8).fill(0).map((column, columnIndex) => (
          <Grid container justifyContent="center" spacing={0} key={`${8 + columnIndex} col`}>
            {Array(8).fill(0).map((cell, index) => (
              <Grid key={board[8 * columnIndex + index]} item justifyContent="center">
                {/* {console.log(index * columnIndex + index)} */}
                <Paper
                  id={board[8 * columnIndex + index]}
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
export default SetPieces;
