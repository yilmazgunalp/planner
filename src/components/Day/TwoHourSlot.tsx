import { Flex } from '@chakra-ui/layout';
import React from 'react';

type TwoHourSlotProps = {
  slot: string;
  filled: boolean;
};

export const TwoHourSlot = ({ slot, filled }: TwoHourSlotProps) => (
  <Flex
    background={filled ? 'red' : '#99DDA0'}
    width="100%"
    height="58px"
    borderRadius="10px"
    className="hello"
    data-index={slot}
    data-filled={filled}
  ></Flex>
);
