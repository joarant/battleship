import React from 'react';
import {
  Button, Box, Typography, Grid,
} from '@material-ui/core';
import BoardStatus from './BoardStatus';
import calculateHitpoints from '../utils/calculateHitpoints';

/**
 * Pelin jälkipyykki ruutu
 * Kertoo pelin lopullisen tilanteen
 * Paljastaa mihin ruutuihin pelaajat lopulta asettivat aluksensa
 * Paljastaa pelin voittajan
 *
 *
 */
const GameOverScreen = ({
  boards, info, fleets,
}) => {
  const getWinner = () => {
    const h1 = calculateHitpoints(Object.values(fleets.p1Fleet));
    const h2 = calculateHitpoints(Object.values(fleets.p2Fleet));

    if (h1 === h2) {
      return 'draw';
    }
    if (h1 > h2) {
      return `${info.player1} won`;
    }

    return `${info.player2} won`;
  };

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      }}
    >
      <Box style={{
        // width: '50px',
        // height: '50px',
        top: '5%',
        position: 'absolute',
        margiTop: '50px',
      }}
      >
        <Grid
          container
          spacing={5}

        >
          <Grid item>
            <BoardStatus
              board={boards?.p1Board}
              opponentName={info.player2}
              measurements={{ x: parseInt(info.x, 10), y: parseInt(info.y, 10) }}
              fleet={fleets.p1Fleet}
              showShipPositions
            />
          </Grid>
          <Grid item>

            <BoardStatus
              board={boards?.p2Board}
              opponentName={info.player1}
              measurements={{ x: parseInt(info.x, 10), y: parseInt(info.y, 10) }}
              fleet={fleets.p2Fleet}
              showShipPositions
            />
          </Grid>

        </Grid>

        <Box
          style={{
            padding: '15px',
          }}
        >
          <Typography variant="h5" gutterBottom component="div">
            {`${getWinner()} `}
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="div">
            Refresh to play again.
          </Typography>
        </Box>
      </Box>

    </Box>

  );
};

export default GameOverScreen;
