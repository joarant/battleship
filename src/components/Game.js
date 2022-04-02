import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import GameInit from './GameInit';
import SetPieces from './SetPieces';
import Play from './Play';
import ReadyCheck from './ReadyCheck';
import GameStatus from './GameStatusScreen';
import calculateHitpoints from '../utils/calculateHitpoints';
import GameOverScreen from './GameOverScreen';

const Game = () => {
  // id :{hit:false, ship: false}
  const [ships, setShips] = useState({
    p1Fleet: {

    },
    p2Fleet: {

    },
  });
  const [boards, setBoards] = useState({ p1Board: {}, p2Board: {} });
  const [hitpoints, setHitpoints] = useState({ p1: 0, p2: 0 });

  const [initInfo, setInitInfo] = useState();
  const [p1ShipsSet, setP1ShipsSet] = useState(false);
  const [p2ShipsSet, setP2ShipsSet] = useState(false);
  const [p1Turn, setP1Turn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [ReadyCheckDone, setReadyCheckDone] = useState(false);

  const shipObjects = {
    carrier: {
      type: 'CARRIER', size: 5, hitpoints: 0, coordinates: [],
    },
    battleship: {
      type: 'BATTLESHIP', size: 4, hitpoints: 0, coordinates: [],
    },
    cruiser: {
      type: 'CRUISER', size: 3, hitpoints: 0, coordinates: [],
    },
    submarine: {
      type: 'SUBMARINE', size: 3, hitpoints: 0, coordinates: [],
    },
    destroyer: {
      type: 'DESTROYER', size: 2, hitpoints: 0, coordinates: [],
    },
  };

  const setInfo = (info) => {
    const availableShips = {};
    const shipKeys = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];
    Object.keys(info).forEach((key) => {
      if (shipKeys.includes(key)) {
        for (let index = 0; index < info[key]; index += 1) {
          availableShips[(key + index)] = { ...shipObjects[key] };
        }
      }
    });
    const infoTemp = info;
    infoTemp.availableShips = availableShips;
    setInitInfo(infoTemp);
  };

  const setReady = (state) => {
    setReadyCheckDone(state);
  };

  const setGameDone = () => {
    setGameOver(true);
  };

  if ((hitpoints.p1 === 0 || hitpoints.p2 === 0) && !gameOver && (p1ShipsSet && p2ShipsSet)) {
    setGameDone();
  }

  const switchTurns = () => {
    setP1Turn(!p1Turn);
    setReadyCheckDone(false);
  };
  console.log(boards);
  const updateStatus = (board, ship) => {
    const tempBoards = boards;
    tempBoards[(p1Turn ? 'p1Board' : 'p2Board')] = board;
    if (ship != null) {
      const tempShips = ships;
      tempShips[(p1Turn ? 'p2Fleet' : 'p1Fleet')][ship].hitpoints -= 1;
      setShips(tempShips);
      setHitpoints({
        p1: calculateHitpoints(Object.values(tempShips.p1Fleet)),
        p2: calculateHitpoints(Object.values(tempShips.p2Fleet)),
      });

      if (tempShips[(p1Turn ? 'p2Fleet' : 'p1Fleet')][ship].hitpoints === 0) {
        switchTurns();
      }
    } else {
      switchTurns();
    }
    console.log('up boards');
    setBoards(tempBoards);
  };

  const setFleet = (fleet) => {
    console.log(fleet, ',ok');
    const tempShips = ships;
    tempShips[(!p1ShipsSet && !p2ShipsSet ? 'p1Fleet' : 'p2Fleet')] = fleet;
    console.log(tempShips, ',ok2');

    if (!p1ShipsSet) {
      setP1ShipsSet(true);
    } else {
      setP2ShipsSet(true);
    }
    setShips(tempShips);
    setHitpoints({
      p1: calculateHitpoints(Object.values(tempShips.p1Fleet)),
      p2: calculateHitpoints(Object.values(tempShips.p2Fleet)),
    });
  };

  return (
    <>
      {!initInfo && !p1ShipsSet && !p2ShipsSet && (<GameInit setGameParameters={setInfo} />)}

      {initInfo && !p1ShipsSet && (
      <SetPieces info={initInfo} shipsSet={setFleet} p1Turn />)}
      {initInfo && !p2ShipsSet && p1ShipsSet && (
      <SetPieces info={initInfo} shipsSet={setFleet} p1Turn={false} />)}

      {p1ShipsSet && p2ShipsSet && !gameOver && p1Turn && !ReadyCheckDone
      && (
      <ReadyCheck
        setReady={setReady}
        boards={boards}
        info={initInfo}
        p1Turn={p1Turn}
        fleets={ships}
      />
      )}

      {p1ShipsSet && p2ShipsSet && !gameOver && p1Turn && ReadyCheckDone
      && (
      <Grid>
        <GameStatus fleets={ships} gameOverFunc={setGameDone} info={initInfo} />
        <Play
          measurements={{ x: parseInt(initInfo.x, 10), y: parseInt(initInfo.y, 10) }}
          ships={ships.p2Fleet}
          updateBoardStatus={updateStatus}
          currentBoard={boards.p1Board}
        />
      </Grid>
      )}

      {p1ShipsSet && p2ShipsSet && !gameOver && !p1Turn && !ReadyCheckDone
      && (
      <ReadyCheck
        setReady={setReady}
        boards={boards}
        info={initInfo}
        p1Turn={p1Turn}
        fleets={ships}
      />
      )}

      {p1ShipsSet && p2ShipsSet && !gameOver && !p1Turn && ReadyCheckDone
      && (
      <>
        <GameStatus fleets={ships} gameOverFunc={setGameDone} info={initInfo} />
        <Play
          measurements={{ x: parseInt(initInfo.x, 10), y: parseInt(initInfo.y, 10) }}
          ships={ships.p1Fleet}
          updateBoardStatus={updateStatus}
          currentBoard={boards.p2Board}
        />
      </>
      )}

      {gameOver && (
      <GameOverScreen
        boards={boards}
        info={initInfo}
        fleets={ships}
      />
      )}

    </>
  );
};

export default Game;
