import React, { useEffect, useState } from 'react';
import {
  Button, Box, Typography, Grid,
} from '@material-ui/core';
import calculateHitpoints from '../utils/calculateHitpoints';

const BoardStatus = ({
  fleet, board, info,
}) => {
  console.log('status');
  return (
    <Box style={{
      display: 'flex', justifyContent: 'flex-end',
    }}
    />
  );
};

export default BoardStatus;
