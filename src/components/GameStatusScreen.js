import React, { useEffect, useState } from 'react';
import {
  Button, Box, Typography, Grid,
} from '@material-ui/core';
import calculateHitpoints from '../utils/calculateHitpoints';

/**
 * Informoi pelaajia hitpoint tilanteesta
 * Sisältää END GAME painikkeen jolla pelin saa loppumaan heti
 *
 *
 */

const GameStatus = ({
  fleets, gameOverFunc, info,
}) => (
  <Box style={{
    display: 'flex', justifyContent: 'flex-end',
  }}
  >
    <Grid>
      <Typography>
        Fleet status:
      </Typography>

      <Typography>
        {`${info.player1} hitpoints: ${calculateHitpoints(Object.values(fleets.p1Fleet))}`}
      </Typography>

      <Typography>
        {`${info.player2} hitpoints: ${calculateHitpoints(Object.values(fleets.p2Fleet))}`}
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

export default GameStatus;
