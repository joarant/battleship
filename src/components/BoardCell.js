import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@material-ui/core';
import GameInit from './GameInit';
import GameBoard from './GameBoard';

const BoardCell = ({ setReady, isDisabled, cellId }) => {
  const [disabled, setDisabled] = useState(isDisabled);

  return (
    <Button
      sx={{
        height: 80,
        width: 80,
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#ffffff'),
      }}
      style={{ alignContent: 'center' }}
      variant="outlined"
      disabled={disabled}
      onClick={() => { setDisabled(true); setReady(cellId); }}
    />
  );
};

export default BoardCell;
