import { Flex, Stack, Text, Spacer } from '@chakra-ui/layout';
import React from 'react';

type DayLabelProps = {
  dayOfTheMonth: string;
  month: string;
  day: string;
};

export const DayLabel = ({ dayOfTheMonth, month, day }: DayLabelProps) => (
  <Stack spacing="3" minWidth="4.5rem">
    <Flex alignItems="center">
      <Text textTransform="uppercase" fontSize="3xl" lineHeight="7">
        {dayOfTheMonth}
      </Text>
      <Spacer />
      <Text casing="uppercase" fontSize="sm" lineHeight="short">
        {month}
      </Text>
    </Flex>
    <Text
      casing="uppercase"
      fontSize="sm"
      letterSpacing="tight"
      lineHeight="short"
    >
      {day}
    </Text>
  </Stack>
);
