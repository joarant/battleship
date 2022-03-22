import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import GameInit from './GameInit';
import GameBoard from './GameBoard';
import Play from './Play';
import ReadyCheck from './ReadyCheck';

const Game = () => {
  // id :{hit:false, ship: false}
  const [ships, setShips] = useState({ p1Fleet: {}, p2Fleet: {} });
  const [boards, setBoards] = useState({ p1Board: {}, p2Board: {} });

  const [initInfo, setInitInfo] = useState();
  const [p1ShipsSet, setP1ShipsSet] = useState(true);
  const [p2ShipsSet, setP2ShipsSet] = useState(true);
  const [p1Turn, setP1Turn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [ReadyCheckDone, setReadyCheckDone] = useState(false);

  const CARRIER = { type: 'CARRIER', hitpoints: 5, coordinates: [0, 1, 2, 3, 4] };
  const PATROL_BOAT = { type: 'PATROL_BOAT', hitpoints: 2, coordinates: [12, 13] };

  const setInfo = (info) => {
    setInitInfo(info);
  };

  const setReady = (state) => {
    setReadyCheckDone(state);
  };

  const updateStatus = (board) => {
    const tempBoards = boards;
    tempBoards[(p1Turn ? 'p1Board' : 'p2Board')] = board;
    setBoards(tempBoards);
    setP1Turn(!p1Turn);
    setReadyCheckDone(false);
  };
  console.log(boards);
  return (
    <>
      {console.log(p1Turn, 'p1Turn')}
      {!initInfo && !p1ShipsSet && !p2ShipsSet && (<GameInit doStuff={setInfo} />)}
      {initInfo && !p1ShipsSet && (<GameBoard info={initInfo} />)}
      {initInfo && !p2ShipsSet && (<GameBoard info={initInfo} />)}

      {p1ShipsSet && p2ShipsSet && !gameOver && p1Turn && !ReadyCheckDone
      && (<ReadyCheck text="Player 1" setReady={setReady} />)}

      {p1ShipsSet && p2ShipsSet && !gameOver && p1Turn && ReadyCheckDone
      && (
      <Play
        measurements={{ x: 4, y: 8 }}
        ships={{ id1: CARRIER, id2: PATROL_BOAT }}
        updateBoardStatus={updateStatus}
        currentBoard={boards.p1Board}
      />
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
      <Play
        measurements={{ x: 4, y: 8 }}
        ships={{ id1: CARRIER, id2: PATROL_BOAT }}
        updateBoardStatus={updateStatus}
        currentBoard={boards.p2Board}

      />
      )}

      {gameOver && (<Play info={initInfo} />)}

    </>
  );
};

export default Game;
