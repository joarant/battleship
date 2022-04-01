import React, { useEffect, useState } from 'react';
import {
  Button, Box, Typography, Grid,
} from '@material-ui/core';
import BoardStatus from './BoardStatus';

const ReadyCheck = ({
  setReady, boards, info, p1Turn, fleets,
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
            />
          </Grid>
          <Grid item>

            <BoardStatus
              board={boards?.p2Board}
              opponentName={info.player1}
              measurements={{ x: parseInt(info.x, 10), y: parseInt(info.y, 10) }}
              fleet={fleets.p2Fleet}
            />
          </Grid>

        </Grid>

        <Box
          style={{
            padding: '15px',
          }}
        >
          <Typography variant="subtitle1" gutterBottom component="div">
            {`${(p1Turn ? info.player1 : info.player2)} get ready`}
          </Typography>
          <Button onClick={() => setReady(true)}>Ready</Button>
        </Box>
      </Box>

    </Box>

  );
};

export default ReadyCheck;
