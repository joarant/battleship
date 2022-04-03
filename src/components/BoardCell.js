import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@material-ui/core';
/**
 * Varsinaisen gameplayn aikan käytetty pelinappula
 * sisältää tiedon siitä vastaako tämä ruutu jotain aluksen osaa ja on tähän ruutuun osuttu
 */
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
        height: 60,
        width: 60,
      }}
      style={{ backgroundColor: getColor() }}
      variant="contained"
      disabled={disabled}
      onClick={() => { setDisabled(true); setReady(cellId); }}
    />
  );
};

export default BoardCell;
