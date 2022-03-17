import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@material-ui/core';
import GameInit from './GameInit';
import GameBoard from './GameBoard';

const ReadyCheck = ({ text, setReady }) => (
  <Box
    justifyContent="center"
    style={{
      margin: '0',
      position: 'absolute',
      top: '50%',
      left: '50%',
      MSTransform: 'translate(-50%, -50%)',
      transform: 'translate(-50%, -50%)',
    }}
    sx={{
      width: 300,
      height: 300,

    }}
  >
    <Typography variant="subtitle1" gutterBottom component="div">
      {text}
    </Typography>
    <Button onClick={() => setReady(true)}>Ready</Button>
  </Box>
);

export default ReadyCheck;
