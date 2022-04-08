import React, { useState } from 'react';
import GameInit from './GameInit';
import SetPieces from './SetPieces';
import calculateHitpoints from '../utils/calculateHitpoints';
import GameOverScreen from './GameOverScreen';
import NewPlay from './NewPlay';

/**
 * Sisältää peli elementit ja seuraa pelin tilaa
 */

const GameNew = () => {
  // id :{hit:false, ship: false}
  const [fleets, setFleets] = useState({
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
  const [gameOver, setGameOver] = useState(false);

  // laivatyypit
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
  // Tuo pelin pystytykseen liittyvät asetukset tänne
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

  const setGameDone = () => {
    setGameOver(true);
  };

  if ((hitpoints.p1 === 0 || hitpoints.p2 === 0) && !gameOver && (p1ShipsSet && p2ShipsSet)) {
    setGameDone();
  }

  const setFleet = (fleet) => {
    const tempShips = fleets;
    tempShips[(!p1ShipsSet && !p2ShipsSet ? 'p1Fleet' : 'p2Fleet')] = fleet;
    setFleets(tempShips);
    setHitpoints({
      p1: calculateHitpoints(Object.values(tempShips.p1Fleet)),
      p2: calculateHitpoints(Object.values(tempShips.p2Fleet)),
    });

    if (!p1ShipsSet) {
      setP1ShipsSet(true);
    } else {
      setP2ShipsSet(true);
    }
  };

  const reset = () => {
    setBoards({ p1Board: {}, p2Board: {} });
    setHitpoints({ p1: 0, p2: 0 });
    setInitInfo();
    setP1ShipsSet(false);
    setP2ShipsSet(false);
    setGameOver(false);
  };

  return (
    <>
      {!initInfo && !p1ShipsSet && !p2ShipsSet && (<GameInit setGameParameters={setInfo} />)}

      {initInfo && !p1ShipsSet && (
      <SetPieces info={initInfo} setShips={setFleet} p1Turn />)}
      {initInfo && !p2ShipsSet && p1ShipsSet && (
      <SetPieces info={initInfo} setShips={setFleet} p1Turn={false} />)}

      {p1ShipsSet && p2ShipsSet && !gameOver
      && (
      <NewPlay
        // setReady={setReady}
        initialBoards={boards}
        info={initInfo}
        // p1Turn={p1Turn}
        initialfleets={fleets}
        endGame={setGameDone}
      />
      )}

      {gameOver && (
      <GameOverScreen
        resetfunc={reset}
        boards={boards}
        info={initInfo}
        fleets={fleets}
      />
      )}

    </>
  );
};

export default GameNew;
