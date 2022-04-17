import { Flex, Stack, Text } from '@chakra-ui/layout';
import React from 'react';

type DayLabelProps = {
  dayOfTheMonth: string;
  month: string;
  day: string;
};

export const DayLabel = ({ dayOfTheMonth, month, day }: DayLabelProps) => (
  <Stack spacing="2" minWidth="4.5rem">
    <Flex alignItems="center" columnGap="2">
      <Text textTransform="uppercase" fontSize="3xl" lineHeight="7">
        {dayOfTheMonth}
      </Text>
      <Text casing="uppercase" fontSize="xs" lineHeight="short">
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
