import React, { useState } from 'react';
import GameInit from './GameInit';
import SetPieces from './SetPieces';
import calculateHitpoints from '../utils/calculateHitpoints';
import GameOverScreen from './GameOverScreen';
import GameplaySection from './GameplaySection';

/**
 * Sisältää peli elementit ja seuraa pelin tilaa
 */

const Game = () => {
  // id :{hit:false, ship: false}
  const [fleets, setFleets] = useState({
    p1Fleet: {

    },
    p2Fleet: {

    },
  });
  const [boards, setBoards] = useState();

  const [initInfo, setInitInfo] = useState();
  const [p1ShipsSet, setP1ShipsSet] = useState(false);
  const [p2ShipsSet, setP2ShipsSet] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // laivatyypit
  const shipObjects = {
    carrier: {
      type: 'CARRIER', size: 5, hitpoints: 0, coordinates: [], image: 'images/carrier.svg',
    },
    battleship: {
      type: 'BATTLESHIP', size: 4, hitpoints: 0, coordinates: [], image: 'images/battleship.svg',
    },
    cruiser: {
      type: 'CRUISER', size: 3, hitpoints: 0, coordinates: [], image: 'images/cruiser.svg',
    },
    submarine: {
      type: 'SUBMARINE', size: 3, hitpoints: 0, coordinates: [], image: 'images/submarine.svg',
    },
    destroyer: {
      type: 'DESTROYER', size: 2, hitpoints: 0, coordinates: [], image: 'images/destroyer.svg',
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

  const createInitBoard = (measurements, fleet) => {
    const tempBoard = {};
    if (Object.keys(tempBoard).length === 0) {
      for (let index = 0; index < measurements.x * measurements.y; index += 1) {
        tempBoard[index] = { hit: false, ship: false, shipId: null };
      }
      Object.entries(fleet).forEach((ship) => {
        ship[1].coordinates.forEach((point) => {
          tempBoard[point].ship = true;
          // eslint-disable-next-line prefer-destructuring
          tempBoard[point].shipId = ship[0];
        });
      });
    }
    return tempBoard;
  };

  const setFleet = (fleet) => {
    const tempShips = fleets;
    tempShips[(!p1ShipsSet && !p2ShipsSet ? 'p1Fleet' : 'p2Fleet')] = fleet;
    setFleets(tempShips);

    if (!p1ShipsSet) {
      setP1ShipsSet(true);
    } else {
      setP2ShipsSet(true);

      setBoards({
        p1Board:
         createInitBoard(
           { x: parseInt(initInfo.x, 10), y: parseInt(initInfo.y, 10) },
           fleets.p2Fleet,
         ),
        p2Board:
         createInitBoard(
           { x: parseInt(initInfo.x, 10), y: parseInt(initInfo.y, 10) },
           fleets.p1Fleet,
         ),
      });
    }
  };

  const reset = () => {
    setBoards();
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
      <GameplaySection
        initialBoards={boards}
        info={initInfo}
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

export default Game;
