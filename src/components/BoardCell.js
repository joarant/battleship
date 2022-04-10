/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
/**
 * Pelinappula
 */
const BoardCell = ({
  setReady, isDisabled, cellId, ship, fleet, shipId,
}) => {
  const [disabled, setDisabled] = useState(isDisabled);

  // painalluksesta kuuluva ääni
  const playaudio = () => {
    if (ship) {
      const x = document.getElementById('myAudio1');
      x.load();
      x.volume = 0.2;
      x.play();
    } else {
      const x = document.getElementById('myAudio2');
      x.load();
      x.volume = 0.2;
      x.play();
    }
  };

  // nappulan väri
  const getColor = () => {
    if (ship && (isDisabled || disabled)) {
      if (fleet[shipId].hitpoints === 0) {
        return 'black';
      }
      return 'darkred';
    }
    if (!ship && (isDisabled || disabled)) {
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
      onClick={() => { setDisabled(true); setReady(cellId); playaudio(); }}
    />
  );
};

export default BoardCell;
