import React, { useEffect, useState } from 'react';
import {
  Button, Box, Typography, Grid,
} from '@material-ui/core';

const GameStatus = ({
  fleets, gameOverFunc,
}) => {
  const [disabled, setDisabled] = useState();

  const calculateHitpoints = (fleet) => {
    let hitpoints = 0;
    fleet.forEach((ship) => {
      hitpoints += ship.hitpoints;
    });
    return hitpoints;
  };
  const hitpointsP1 = calculateHitpoints(Object.values(fleets.p1Fleet));
  const hitpointsP2 = calculateHitpoints(Object.values(fleets.p2Fleet));

  if (hitpointsP1 === 0 || hitpointsP2 === 0) {
    gameOverFunc();
  }

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
          Player 1 hitpoints:
          {hitpointsP1}
        </Typography>

        <Typography>
          Player 2 hitpoints:
          {hitpointsP2}

        </Typography>

        <Button
          style={{ alignContent: 'center', backgroundColor: '#ffffff', color: 'black' }}
          variant="contained"
          onClick={() => gameOverFunc}
        >
          End Game
        </Button>
      </Grid>
    </Box>
  );
};

export default GameStatus;
