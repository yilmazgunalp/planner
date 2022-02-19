import { Box, Flex } from '@chakra-ui/layout';
import React, { ReactNode } from 'react';

import styles from './Day.module.css';

type TwoHourSlotProps = {
  // gridColumnStart: string;
  // gridColumnEnd: string;
  slot: string;
  filled: boolean;
};

export const TwoHourSlot = ({
  slot,
  filled,
}: // gridColumnStart,
// gridColumnEnd,
TwoHourSlotProps) => (
  <Flex
    background={filled ? 'red' : '#99DDA0'}
    width="100%"
    height="58px"
    borderRadius="10px"
    className="hello"
    data-index={slot}
    data-filled={filled}

    // gridColumn={`${gridColumnStart} / ${gridColumnEnd}`}
  ></Flex>
);
