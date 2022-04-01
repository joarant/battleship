import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@material-ui/core';

const BoardCell = ({
  setReady, isDisabled, cellId, ship, fleet, shipId,
}) => {
  const [disabled, setDisabled] = useState(isDisabled);

  const getColor = () => {
    if (ship && isDisabled) {
      if (fleet[shipId].hitpoints === 0) {
        return 'black';
      }
      return 'darkred';
    }
    if (!ship && isDisabled) {
      return '#808080';
    }
    return 'white';
  };

  return (
    <Button
      sx={{
        height: 80,
        width: 80,
      }}
      style={{ backgroundColor: getColor() }}
      variant="contained"
      disabled={disabled}
      onClick={() => { setDisabled(true); setReady(cellId); }}
    />
  );
};

export default BoardCell;
