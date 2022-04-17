import { Flex, Text } from '@chakra-ui/layout';
import React from 'react';
import { Slot } from './Day';

type TimeLabelsProps = {
  slots: Slot[];
};

const minutes = {
  '1': '06:00',
  '2': '06:30',
  '3': '07:00',
  '4': '07:30',
  '5': '08:00',
  '6': '08:30',
  '7': '09:00',
  '8': '09:30',
  '9': '10:00',
  '10': '10:30',
  '11': '11:00',
  '12': '11:30',
  '13': '12:00',
  '14': '12:30',
  '15': '13:00',
  '16': '13:30',
  '17': '14:00',
  '18': '14:30',
  '19': '15:00',
  '20': '15:30',
  '21': '16:00',
  '22': '16:30',
  '23': '17:00',
  '24': '17:30',
  '25': '18:00',
};

export const TimeLabels = ({ slots }: TimeLabelsProps) => {
  return (
    <Flex
      alignItems="center"
      display="grid"
      gridTemplateColumns="repeat(126, 1fr)"
      width="630px"
    >
      <TimeLabel time={minutes[1]} gridColumn="1 / 7" />
      {slots.map(slot => {
        const start = (+slot.gridColumnEnd - 1) * 5 + 1;
        return (
          <TimeLabel
            time={minutes[slot.gridColumnEnd]}
            gridColumn={`${start} / ${start + 6}`}
          />
        );
      })}
    </Flex>
  );
};

const TimeLabel = ({ time, gridColumn }) => (
  <Text
    casing="uppercase"
    fontSize="xs"
    fontFamily="sans-serif"
    letterSpacing="tight"
    lineHeight="100%"
    gridColumn={gridColumn}
  >
    {time}
  </Text>
);
