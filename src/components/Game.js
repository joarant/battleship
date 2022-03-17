import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import GameInit from './GameInit';
import GameBoard from './GameBoard';
import Play from './Play';
import ReadyCheck from './ReadyCheck';

const Game = () => {
  const [ships, setShips] = useState({ p1Fleet: {}, p2Fleet: {} });

  const [initInfo, setInitInfo] = useState();
  const [p1ShipsSet, setP1ShipsSet] = useState(false);
  const [p2ShipsSet, setP2ShipsSet] = useState(false);
  const [p1Turn, setP1Turn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [ReadyCheckDone, setReadyCheckDone] = useState(false);

  const setInfo = (info) => {
    setInitInfo(info);
  };

  return (
    <>
      {!initInfo && (<GameInit doStuff={setInfo} />)}
      {initInfo && !p1ShipsSet && (<GameBoard info={initInfo} />)}
      {initInfo && !p2ShipsSet && (<GameBoard info={initInfo} />)}

      {p1ShipsSet && p2ShipsSet && !gameOver && p1Turn && !ReadyCheckDone
      && (<ReadyCheck text="Player 1" />)}

      {p1ShipsSet && p2ShipsSet && !gameOver && p1Turn && ReadyCheckDone
      && (<Play info={initInfo} />)}

      {p1ShipsSet && p2ShipsSet && !gameOver && !p1Turn && !ReadyCheckDone
      && (<ReadyCheck text="Player 2" />)}

      {p1ShipsSet && p2ShipsSet && !gameOver && !p1Turn && ReadyCheckDone
      && (<Play info={initInfo} />)}

      {gameOver && (<Play info={initInfo} />)}

    </>
  );
};

export default Game;
