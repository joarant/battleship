import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@material-ui/core';
import GameInit from './GameInit';
import GameBoard from './GameBoard';

const ReadyCheck = (text, setReady) => (
  <Box>
    <Typography>
      {text}
    </Typography>
    <Button>Ready</Button>
  </Box>
);

export default ReadyCheck;
