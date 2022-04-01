import React from 'react';
import {
  Button, Box, Typography, Grid,
} from '@material-ui/core';
import BoardStatus from './BoardStatus';

const GameOverScreen = ({
  boards, info, p1Won, fleets,
}) => {
  console.log(boards);

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
          <Typography variant="subtitle1" gutterBottom component="div">
            {`${(p1Won ? info.player1 : info.player2)} won.`}
            Refresh to play again.
          </Typography>
        </Box>
      </Box>

    </Box>

  );
};

export default GameOverScreen;
