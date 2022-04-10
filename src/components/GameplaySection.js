/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react';
import {
  Button, Box, Typography, Grid,
} from '@material-ui/core';
import BoardStatus from './BoardStatus';
import Play from './Play';
import calculateHitpoints from '../utils/calculateHitpoints';
import Health from './PlayerHealth';

/**
 * Sisältää pelinpelaamiseen liittyvät komponentit
 */
const GameplaySection = ({
  initialBoards, info, initialfleets, endGame,
}) => {
  const [p1Turn, setP1Turn] = useState(false);
  const [readyCheckDone, setReadyCheckDone] = useState(false);

  const [fleets, setFleets] = useState(initialfleets);
  const [boards, setBoards] = useState(initialBoards);
  const [hitpoints, setHitpoints] = useState(
    {
      p1: calculateHitpoints(Object.values(fleets.p1Fleet)),
      p2: calculateHitpoints(Object.values(fleets.p2Fleet)),
    },
  );

  const switchTurns = () => {
    setReadyCheckDone(false);
  };
  // antaa pelintilan isäntä elementille
  const updateStatus = (board, ship) => {
    const tempBoards = boards;
    tempBoards[(p1Turn ? 'p1Board' : 'p2Board')] = board;
    if (ship != null) {
      const tempShips = fleets;
      tempShips[(p1Turn ? 'p2Fleet' : 'p1Fleet')][ship].hitpoints -= 1;
      setFleets(tempShips);

      if (p1Turn) {
        setHitpoints({
          ...hitpoints, ...{ p2: hitpoints.p2 - 1 },
        });
      } else {
        setHitpoints({
          ...hitpoints, ...{ p1: hitpoints.p1 - 1 },
        });
      }

      if (tempShips[(p1Turn ? 'p2Fleet' : 'p1Fleet')][ship].hitpoints === 0) {
        switchTurns();
      }
    } else {
      switchTurns();
    }
    setBoards(tempBoards);
  };

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      }}
    >
      {/* Osuma ääniefekti */}
      <audio id="myAudio1">
        <source
          src="audio/mixkit-explosion-hit-1704.wav"
          type="audio/wav"
        />
      </audio>
      {/* huti ääniefekti */}
      <audio id="myAudio2">
        <source
          src="audio/mixkit-sea-mine-explosion-1184.wav"
          type="audio/wav"
        />
      </audio>
      <Box style={{
        top: '5%',
        position: 'absolute',
        margiTop: '50px',
      }}
      >
        <Grid
          container
          spacing={5}
        >
          {/* Yhden pelaajan laivasto on toisen pelaajan laudalla */}
          <Grid item>
            {!p1Turn && readyCheckDone
              ? (
                <Play
                  measurements={{ x: parseInt(info.x, 10), y: parseInt(info.y, 10) }}
                  ships={fleets.p1Fleet}
                  updateBoardStatus={updateStatus}
                  currentBoard={boards.p2Board}
                />
              ) : (
                <BoardStatus
                  board={boards?.p2Board}
                  opponentName={info.player1}
                  measurements={{ x: parseInt(info.x, 10), y: parseInt(info.y, 10) }}
                  fleet={fleets.p1Fleet}

                />

              )}
          </Grid>
          <Grid item>
            {p1Turn && readyCheckDone ? (
              <Play
                measurements={{ x: parseInt(info.x, 10), y: parseInt(info.y, 10) }}
                ships={fleets.p2Fleet}
                updateBoardStatus={updateStatus}
                currentBoard={boards.p1Board}
              />

            ) : (
              <BoardStatus
                board={boards?.p1Board}
                opponentName={info.player2}
                measurements={{ x: parseInt(info.x, 10), y: parseInt(info.y, 10) }}
                fleet={fleets.p2Fleet}
              />
            )}
          </Grid>

        </Grid>

        {!readyCheckDone && (
        <Box
          style={{
            padding: '15px',
          }}
        >
          <Typography variant="subtitle1" gutterBottom component="div">
            {`${(!p1Turn ? info.player1 : info.player2)} valmistaudu`}
          </Typography>
          <Button
            variant="outlined"
            color="success"
            style={{ }}
            onClick={() => { setP1Turn(!p1Turn); setReadyCheckDone(true); }}
          >
            Valmis

          </Button>

        </Box>
        )}
        <Health fleets={fleets} gameOverFunc={endGame} info={info} health={hitpoints} />

      </Box>

    </Box>

  );
};

export default GameplaySection;
