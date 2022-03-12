import React, { useEffect, useState } from 'react';
import GameInit from './GameInit';
import GameBoard from './GameBoard';

const Game = () => {
  const [play, setPlay] = useState(false);
  const [initInfo, setInitInfo] = useState({});

  const doStuff2 = () => {
    console.log('moi');
    // setPlay(state);
    // setInitInfo(info);
  };

  return (
    <>
      {!play && (<GameInit doStuff={doStuff2} />)}
      {play && (<GameBoard info={initInfo} />)}
    </>
  );
};
export default Game;
