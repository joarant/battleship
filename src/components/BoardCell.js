import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@material-ui/core';

const BoardCell = ({
  setReady, isDisabled, cellId, ship,
}) => {
  const [disabled, setDisabled] = useState(isDisabled);
  return (
    <Button
      sx={{
        height: 80,
        width: 80,
        // backgroundColor: (theme) => (ship && disabled ? '#1A2027' : '#ffffff'),
      }}
      style={!disabled ? { backgroundColor: 'white' }
        : { backgroundColor: (ship ? 'darkred' : 'grey') }}
      variant="contained"
      disabled={disabled}
      onClick={() => { setDisabled(true); setReady(cellId); }}
    />
  );
};

export default BoardCell;
