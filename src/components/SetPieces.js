import React, { useEffect, useState } from 'react';
import {
  Grid, Paper, Button, Typography, Box,
} from '@material-ui/core';
import Ship from './Ship';

/**
 * Piirtää ruudukon johon pelaajat asettelevat aluksensa
 */

function SetPieces({ info, setShips, p1Turn }) {
  const board = [];

  const x = parseInt(info.x, 10);
  const y = parseInt(info.y, 10);

  // ship
  // id: { type: '', hitpoints: null, size: null, coordinates: [] };
  const ships = { ...info.availableShips };

  const addInfoToBoardObject = (newObject, shipId) => {
    ships[shipId] = newObject;
  };

  const isCoordinateFree = (point, shipId) => {
    let free = true;
    Object.keys(ships).filter((key) => key !== shipId).forEach((ship) => {
      if (ships[ship].coordinates.findIndex((coPoint) => coPoint === point) !== -1) {
        free = false;
      }
    });

    return free;
  };

  // tarkistaa liikkeen laillisuuden, jos laiton niin älä suorita
  const checkIfMoveIsLegal = (shipSize, shipOrientation, targetCell, shipId) => {
    // math.floor(target.id / rivin pituus) = sama kaikilla jotka ovat samassa rivissä
    // mod(target.id/ rivin pituus) on sama kaikilla jotka ovat samassa pystyrivissä
    if (shipOrientation) {
      const refrenceNum = Math.floor(parseInt(targetCell.id, 10) / x);
      for (let index = 0; index < shipSize; index += 1) {
        const nextCell = document.getElementById(parseInt(targetCell.id, 10) + index);

        if (nextCell === null || !isCoordinateFree(nextCell.id, shipId)) {
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
        if (nextCell === null || !isCoordinateFree(nextCell.id, shipId)) {
          console.log('false');
          return false;
        }

        if (!(parseInt(nextCell.id, 10) % x === refrenceNum)) {
          return false;
        }
      }
    }
    return true;
  };

  // Asettaa aluksen ruudukkoon ja antaa tämän tiedon parent elementille
  const changeMovedObject = (shipId, objectGrabbedCell, horizontalOrientation) => {
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
      && checkIfMoveIsLegal(ships[shipId].size, horizontalOrientation, correctCell, shipId)) {
        const rect = correctCell.getBoundingClientRect();

        correctCell.appendChild(document.getElementById(shipId));

        if (horizontalOrientation) {
          draggable.style.left = '0px';
          draggable.style.top = '0px';
        } else {
          const width = -((draggable.getBoundingClientRect().height
           - draggable.getBoundingClientRect().width) / 2);
          const height = ((draggable.getBoundingClientRect().height
          - draggable.getBoundingClientRect().width) / 2);

          draggable.style.left = `${width}px`;
          draggable.style.top = `${height}px`;
        }

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
      } else if (horizontalOrientation) {
        draggable.style.left = '0px';
        draggable.style.top = '0px';
      } else {
        draggable.style.left = `${-((draggable.getBoundingClientRect().height
          - draggable.getBoundingClientRect().width) / 2)}px`;
        draggable.style.top = `${((draggable.getBoundingClientRect().height
           - draggable.getBoundingClientRect().width) / 2)}px`;
      }
    }, { once: true });
  };
  // luo ruudukon
  for (let index = 0; index < y; index += 1) {
    for (let a = 0; a < x; a += 1) {
      board.push((index * y + a).toString());
    }
  }

  return (
    <>

      <Grid
        container
        spacing={2}
        rowSpacing={5}
        direction="column"
        id="grid"
        style={{
        }}
      >

        <Grid item>
          <Typography variant="h5" style={{ padding: '5px' }}>
            {`${(p1Turn ? info.player1 : info.player2)} aseta laivastosi`}

          </Typography>

          <Typography variant="subtitle1" style={{ padding: '5px' }}>
            käännä alusta painamalla r
          </Typography>
        </Grid>
        <Grid
          container
        >
          <Paper
            variant="outlined"
            style={{
              marginLeft: '32.75%',
              // marginRight: 'auto',
            }}
          >
            {Array(y).fill(0).map((column, columnIndex) => (
              <Grid container justifyContent="center" spacing={0} key={`${y + columnIndex} col`}>
                {Array(x).fill(0).map((cell, index) => (
                  <Grid key={board[y * columnIndex + index]} item justifyContent="center">
                    <Paper
                      id={board[y * columnIndex + index]}
                      sx={{
                        height: 60,
                        width: 60,
                        backgroundColor: 'white',
                      }}
                      style={{ position: 'relative' }}
                      variant="outlined"
                    />
                  </Grid>
                ))}
              </Grid>
            ))}
          </Paper>
          <Paper>

            {Object.keys(ships).map((ship) => (
              <Grid key={ship}>
                <Paper
                  id={`${ship}-paper`}
                  sx={{
                    height: 60,
                    width: 300,
                    backgroundColor: 'white',
                  }}
                  style={{ position: 'relative' }}

                >
                  <Ship
                    imgId={ship}
                    setShip={changeMovedObject}
                    size={ships[ship].size}
                  />
                </Paper>
              </Grid>

            ))}
          </Paper>

        </Grid>

      </Grid>
      <Button onClick={() => setShips(ships)} variant="outlined"> Valmis </Button>

    </>
  );
}
export default SetPieces;
