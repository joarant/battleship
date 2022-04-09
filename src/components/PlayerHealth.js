import React from 'react';
import {
  Button, Box, Typography, Grid,
} from '@material-ui/core';

/**
 * Informoi pelaajia hitpoint tilanteesta
 * Sisältää END GAME painikkeen jolla pelin saa loppumaan heti
 */

const Health = ({
  gameOverFunc, info, health,
}) => {
  if (health.p1 === 0 || health.p2 === 0) {
    gameOverFunc();
  } return (
    <Box style={{
    }}
    >
      <Grid>
        <Typography>
          Laivastojen tila:
        </Typography>

        <Typography>
          {`${info.player1} elämäpisteitä: ${health.p1}`}
        </Typography>

        <Typography>
          {`${info.player2} elämäpisteitä: ${health.p2}`}
        </Typography>

        <Button
          style={{ alignContent: 'center', backgroundColor: 'red', color: 'black' }}
          variant="contained"
          onClick={() => gameOverFunc()}
        >
          Lopeta Peli
        </Button>
      </Grid>
    </Box>
  );
};

export default Health;
