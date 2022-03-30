import React, { useEffect, useState } from 'react';
import {
  Button, Box, Typography, Grid,
} from '@material-ui/core';
import calculateHitpoints from '../utils/calculateHitpoints';

const GameStatus = ({
  fleets, gameOverFunc, info,
}) => {
  const hitpointsP1 = calculateHitpoints(Object.values(fleets.p1Fleet));
  const hitpointsP2 = calculateHitpoints(Object.values(fleets.p2Fleet));

  return (
    <Box style={{
      display: 'flex', justifyContent: 'flex-end',
    }}
    >
      <Grid>
        <Typography>
          Fleet status:
        </Typography>

        <Typography>
          {`${info.player1} hitpoints: ${hitpointsP1}`}
        </Typography>

        <Typography>
          {`${info.player2} hitpoints: ${hitpointsP2}`}
        </Typography>

        <Button
          style={{ alignContent: 'center', backgroundColor: '#ffffff', color: 'black' }}
          variant="contained"
          onClick={() => gameOverFunc()}
        >
          End Game
        </Button>
      </Grid>
    </Box>
  );
};

export default GameStatus;
