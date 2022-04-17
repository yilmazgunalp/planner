import { Flex } from '@chakra-ui/layout';
import React from 'react';
import { theme } from '../../../theme';
type TwoHourSlotProps = {
  slot: string;
  filled: boolean;
};

export const TwoHourSlot = ({ slot, filled }: TwoHourSlotProps) => (
  <Flex
    background={filled ? theme.colors.yellow[200] : theme.colors.green[200]}
    width="100%"
    height="58px"
    borderRadius={theme.radii.xl}
    className="hello"
    data-index={slot}
    data-filled={filled}
  ></Flex>
);
