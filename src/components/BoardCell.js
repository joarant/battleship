import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@material-ui/core';
import { makeStyles, createTheme } from '@mui/styles';
import GameInit from './GameInit';
import GameBoard from './GameBoard';

const BoardCell = ({
  setReady, isDisabled, cellId, ship,
}) => {
  const [disabled, setDisabled] = useState(isDisabled);
  // const classes = useStyles();

  return (
    <Button
      sx={{
        height: 80,
        width: 80,
        // className={classes.root}
        backgroundColor: (theme) => (ship && disabled ? '#1A2027' : '#ffffff'),
      }}
      style={disabled ? { alignContent: 'center', backgroundColor: '#990000' }
        : { alignContent: 'center', backgroundColor: '#ffffff' }}
      variant="contained"
      disabled={disabled}
      onClick={() => { setDisabled(true); setReady(cellId); }}
    />
  );
};

export default BoardCell;
