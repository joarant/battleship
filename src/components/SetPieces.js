import React, { useEffect, useState } from 'react';
import {
  Grid, Paper, Button, Typography,
} from '@material-ui/core';
import Ship from './Ship';

function SetPieces({ info, shipsSet, p1Turn }) {
  const board = [];
  const x = parseInt(info.x, 10);
  const y = parseInt(info.y, 10);

  // ship
  // id: { type: '', hitpoints: null, size: null, coordinates: [] };
  const ships = { ...info.availableShips };

  const addInfoToBoardObject = (newObject, shipId) => {
    ships[shipId] = newObject;
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
      if (board.includes(correctCell?.id)
      && checkIfMoveIsLegal(ships[shipId].size, horizontalOrientation, correctCell)) {
        const rect = correctCell.getBoundingClientRect();

        draggable.style.left = `${rect.x}px`;
        draggable.style.top = `${rect.y}px`;

        const coordinateArray = [];
        if (!horizontalOrientation) {
          for (let index = 0; index < ships[shipId].size; index += 1) {
            coordinateArray.push((parseInt(correctCell.id, 10) + index * x).toString());
          }
        } else {
          for (let index = 0; index < ships[shipId].size; index += 1) {
            coordinateArray.push((parseInt(correctCell.id, 10) + index).toString());
          }
        }
        addInfoToBoardObject({
          ...ships[shipId],
          ...{
            coordinates: coordinateArray,
            hitpoints: coordinateArray.length,
          },
        }, shipId);
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

      <Grid
        item
        xs={12}
        id="grid"
        style={{
        }}
      >

        {Object.keys(ships).map((ship) => (
          <Ship
            imgId={ship}
            setShip={changeMovedObject}
            size={ships[ship].size}
            key={ship}
          />
        ))}

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
                    height: 60,
                    width: 60,
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

      <Button onClick={() => shipsSet(ships)} variant="outlined"> Done </Button>
    </>
  );
}
export default SetPieces;
