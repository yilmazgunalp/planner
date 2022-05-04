import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { DayLabel } from './DayLabel';
import { Day } from './Day';

type DayHolderProps = {
  dayOfTheMonth: string;
  month: string;
  day: string;
  storageKey: string;
};

export const DayHolder = ({ storageKey, ...props }: DayHolderProps) => {
  return (
    <Flex width="100%">
      <Box alignSelf="flex-end">
        <DayLabel {...props} />
      </Box>
      <Day storageKey={storageKey} />
    </Flex>
  );
};
