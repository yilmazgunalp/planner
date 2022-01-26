import { Box } from '@chakra-ui/layout';
import React, { ReactNode } from 'react';

import styles from './Day.module.css';

type TwoHourSlotProps = {};

export const TwoHourSlot = () => (
  <Box
    background="#99DDA0"
    width="100px"
    height="58px"
    borderRadius="10px"
    gridColumn="15 / span 4"
  ></Box>
);
