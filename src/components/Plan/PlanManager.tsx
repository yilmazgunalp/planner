import React, { useState } from 'react';
import { DayHolder } from 'components/Day/DayHolder';

import { PlanContext } from './planContext';

import { useLocalstorageState } from 'rooks';

type Props = {};

export const PlanManager = ({}: Props) => {
  // const [plans, setPlans] = useState({});
  // const [plans, set, remove] = useLocalstorageState('plans', {});

  return (
    <PlanContext.Provider value={{}}>
      <DayHolder day="Monday" dayOfTheMonth="24" month="dec" />
    </PlanContext.Provider>
  );
};
