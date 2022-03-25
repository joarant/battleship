import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import GameInit from './GameInit';
import GameBoard from './GameBoard';
import Play from './Play';
import ReadyCheck from './ReadyCheck';
import GameStatus from './GameStatusScreen';

const Game = () => {
  // id :{hit:false, ship: false}
  const [ships, setShips] = useState({
    p1Fleet: {
      id1: { type: 'CARRIER', hitpoints: 1, coordinates: [1] },
      id2: { type: 'PATROL_BOAT', hitpoints: 1, coordinates: [0] },
    },
    p2Fleet: { id3: { type: 'CARRIER', hitpoints: 1, coordinates: [1] } },
  });
  const [boards, setBoards] = useState({ p1Board: {}, p2Board: {} });

  const [initInfo, setInitInfo] = useState();
  const [p1ShipsSet, setP1ShipsSet] = useState(true);
  const [p2ShipsSet, setP2ShipsSet] = useState(true);
  const [p1Turn, setP1Turn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [ReadyCheckDone, setReadyCheckDone] = useState(false);

  const setInfo = (info) => {
    setInitInfo(info);
  };

  const setReady = (state) => {
    setReadyCheckDone(state);
  };

  const setGameDone = () => {
    setGameOver(true);
  };

  const updateStatus = (board, ship) => {
    const tempBoards = boards;
    tempBoards[(p1Turn ? 'p1Board' : 'p2Board')] = board;
    if (ship != null) {
      const tempShips = ships;
      console.log('dasx');
      tempShips[(p1Turn ? 'p2Fleet' : 'p1Fleet')][ship].hitpoints -= 1;
      setShips(tempShips);
    }
    setBoards(tempBoards);
    setP1Turn(!p1Turn);
    setReadyCheckDone(false);
  };

  return (
    <>
      {!initInfo && !p1ShipsSet && !p2ShipsSet && (<GameInit doStuff={setInfo} />)}
      {initInfo && !p1ShipsSet && (<GameBoard info={initInfo} />)}
      {initInfo && !p2ShipsSet && (<GameBoard info={initInfo} />)}

      {p1ShipsSet && p2ShipsSet && !gameOver && p1Turn && !ReadyCheckDone
      && (<ReadyCheck text="Player 1" setReady={setReady} />)}

      {p1ShipsSet && p2ShipsSet && !gameOver && p1Turn && ReadyCheckDone
      && (
      <Grid>
        <GameStatus fleets={ships} gameOverFunc={setGameDone} />
        <Play
          measurements={{ x: 4, y: 8 }}
          ships={ships.p2Fleet}
          updateBoardStatus={updateStatus}
          currentBoard={boards.p1Board}
        />
      </Grid>
      )}

      {p1ShipsSet && p2ShipsSet && !gameOver && !p1Turn && !ReadyCheckDone
      && (
      <ReadyCheck
        text="Player 2"
        setReady={setReady}
      />
      )}

      {p1ShipsSet && p2ShipsSet && !gameOver && !p1Turn && ReadyCheckDone
      && (
      <>
        <GameStatus fleets={ships} gameOverFunc={setGameDone} />
        <Play
          measurements={{ x: 4, y: 8 }}
          ships={ships.p1Fleet}
          updateBoardStatus={updateStatus}
          currentBoard={boards.p2Board}
        />
      </>

      )}

      {gameOver && (<Play info={initInfo} />)}

    </>
  );
};

export default Game;
