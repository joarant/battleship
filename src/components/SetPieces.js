import React, { useEffect, useState } from 'react';
import {
  Grid, Paper, Button, Typography,
} from '@material-ui/core';
import Ship from './Ship';

// https://www.w3schools.com/howto/howto_js_draggable.asp
// https://stackoverflow.com/questions/1009753/pass-mouse-events-through-absolutely-positione-elementd
function SetPieces({ info, shipsSet, p1Turn }) {
  const board = [];
  const x = parseInt(info.x, 10);
  const y = parseInt(info.y, 10);

  // ship
  // id: { type: '', hitpoints: null, coordinates: [] };
  const ships = { ...info.availableShips };

  const addInfoToBoardObject = (newObject, shipId) => {
    ships[shipId] = newObject;
    // console.log(ships);
  };

  const checkIfMoveIsLegal = (shipSize, shipOrientation, targetCell) => {
    // math.floor(target.id / rivin pituus) = sama kaikilla jotka ovat samassa rivissä
    // mod(target.id/ rivin pituus) on sama kaikilla jotka ovat samassa pystyrivissä
    if (shipOrientation) {
      const refrenceNum = Math.floor(parseInt(targetCell.id, 10) / x);
      for (let index = 0; index < shipSize; index += 1) {
        const nextCell = document.getElementById(parseInt(targetCell.id, 10) + index);
        if (nextCell === null) {
          return false;
        }
        if (!(Math.floor(parseInt(nextCell.id, 10) / x) === refrenceNum)) {
          console.log('laiton');
          return false;
        }
      }
    } else {
      const refrenceNum = parseInt(targetCell.id, 10) % x;
      for (let index = 0; index < shipSize; index += 1) {
        const nextCell = document.getElementById(parseInt(targetCell.id, 10) + index * x);
        if (nextCell === null) {
          return false;
        }

        if (!(parseInt(nextCell.id, 10) % x === refrenceNum)) {
          console.log('laiton');
          return false;
        }
      }
    }
    return true;
  };

  const changeMovedObject = (shipId, initialPosition, objectGrabbedCell, horizontalOrientation) => {
    window.addEventListener('mouseup', (e) => {
      const draggable = document.getElementById(shipId);
      let correctCell = null;
      if (horizontalOrientation) {
        correctCell = document.getElementById(
          (parseInt(e.target.id, 10) - objectGrabbedCell).toString(),
        );
      } else {
        correctCell = document.getElementById(
          (parseInt(e.target.id, 10) - objectGrabbedCell * x).toString(),
        );
      }
      // console.log(correctCell.id, e.target.id);
      if (board.includes(correctCell?.id)
      && checkIfMoveIsLegal(ships[shipId].hitpoints, horizontalOrientation, correctCell)) {
        const rect = correctCell.getBoundingClientRect();

        draggable.style.left = `${rect.x}px`;
        draggable.style.top = `${rect.y}px`;

        const coordinateArray = [];
        if (!horizontalOrientation) {
          // console.log('pysty');
          for (let index = 0; index < ships[shipId].hitpoints; index += 1) {
            coordinateArray.push((parseInt(correctCell.id, 10) + index * x).toString());
          }
        } else {
          for (let index = 0; index < ships[shipId].hitpoints; index += 1) {
            coordinateArray.push((parseInt(correctCell.id, 10) + index).toString());
          }
        }
        addInfoToBoardObject({ ...ships[shipId], ...{ coordinates: coordinateArray } }, shipId);
      } else {
        draggable.style.left = `${initialPosition.x}px`;
        draggable.style.top = `${initialPosition.y}px`;
      }
    }, { once: true });
  };

  for (let index = 0; index < y; index += 1) {
    for (let a = 0; a < x; a += 1) {
      board.push((index * y + a).toString());
    }
  }

  return (
    <>
      {/* <Ship imgId="id1" setShip={changeMovedObject} size={2} />
      <Ship imgId="id2" setShip={changeMovedObject} size={2} /> */}
      {Object.keys(ships).map((ship) => (
        <Ship
          imgId={ship}
          setShip={changeMovedObject}
          size={ships[ship].hitpoints}
          key={ship}
        />
      ))}

      <Grid
        item
        xs={12}
        id="grid"
        style={{
        }}
      >
        <Typography variant="h5">
          {`${(p1Turn ? info.player1 : info.player2)} set your fleet`}

        </Typography>
        {Array(y).fill(0).map((column, columnIndex) => (
          <Grid container justifyContent="center" spacing={0} key={`${y + columnIndex} col`}>
            {Array(x).fill(0).map((cell, index) => (
              <Grid key={board[y * columnIndex + index]} item justifyContent="center">
                <Paper
                  id={board[y * columnIndex + index]}
                  sx={{
                    height: 80,
                    width: 80,
                    // opacity: 0.5,
                    backgroundColor: 'white',
                  }}
                  style={{ alignContent: 'center' }}
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
      <Button onClick={() => shipsSet(ships)}> Done </Button>
    </>
  );
}
export default SetPieces;
