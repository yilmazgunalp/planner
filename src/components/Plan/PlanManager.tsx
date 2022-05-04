import React from 'react';
import { DayHolder } from 'components/Day/DayHolder';
import Link from 'next/link';

import { PlanContext } from './planContext';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { theme } from '../../../theme';

import { Flex, Stack } from '@chakra-ui/layout';
import { useDate, DayEnum, MonthEnum, getDateParts } from './useDate';
import { useHashParam } from '../../utils';

type Props = {};

export const PlanManager = ({}: Props) => {
  const [today, tomorrow] = useDate();
  const hash = useHashParam();

  const [day, date, month, year] = getDateParts(hash ? tomorrow : today);

  return (
    <PlanContext.Provider value={{}}>
      <Stack width="max-content" gap="3">
        <Flex
          justifyContent={hash ? 'flex-start' : 'flex-end'}
          alignItems="center"
          color={theme.colors.yellow[500]}
          paddingLeft={hash ? '16' : '0'}
        >
          {hash && <ArrowBackIcon />}
          <Link href={!hash ? '#tomorrow' : '/day-planner'}>
            <a style={{ fontSize: '12px' }}>{hash ? 'Today' : 'Tomorrow'}</a>
          </Link>
          {!hash && <ArrowForwardIcon />}
        </Flex>
        <DayHolder
          storageKey={[date, MonthEnum[month], year].join('')}
          day={DayEnum[day]}
          dayOfTheMonth={date.toString()}
          month={MonthEnum[month]}
        />
      </Stack>
    </PlanContext.Provider>
  );
};
