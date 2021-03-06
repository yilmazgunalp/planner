import Layout from 'components/generic/Layout';

import { Stack } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import React from 'react';
import Quote from 'components/generic/Quote';
import { PlanManager } from 'components/Plan/PlanManager';

const DayPlanner = () => (
  <Layout title="Day Planner">
    <Stack gap="14">
      <Quote
        quote="Either you run the day or the day runs you."
        by="Jim Rohn"
      />
      <Heading as="h1" textAlign="center">
        Plan your Day
      </Heading>
      <PlanManager />
    </Stack>
    <Stack m="50px auto" backgroundColor="gray.900" width="max-content"></Stack>
  </Layout>
);

export default DayPlanner;
