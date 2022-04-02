import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@material-ui/core';
import calculateHitpoints from '../utils/calculateHitpoints';

const GameStatus = ({
  fleets, gameOverFunc,
}) => {
  const [disabled, setDisabled] = useState();

  const hitpointsP1 = calculateHitpoints(Object.values(fleets.p1Fleet));
  const hitpointsP2 = calculateHitpoints(Object.values(fleets.p2Fleet));

  if (hitpointsP1 === 0 || hitpointsP2 === 0) {
    gameOverFunc();
  }

  return (
    <Box>
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
        style={{ alignContent: 'center', backgroundColor: '#ffffff' }}
        variant="contained"
        onClick={() => gameOverFunc}
      >
        End Game
      </Button>
    </Box>
  );
};

export default GameStatus;
