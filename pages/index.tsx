import Layout from 'components/generic/Layout';

import { Stack } from '@chakra-ui/react';
import { DayHolder } from 'components/Day/DayHolder';
import { Heading } from '@chakra-ui/react';
import React from 'react';
import Quote from 'components/generic/Quote';

const IndexPage = () => (
  <Layout title="School Holidays Planner">
    <Stack gap="14">
      <Quote
        quote="Either you run the day or the day runs you."
        by="Jim Rohn"
      />
      <Heading as="h1" textAlign="center">
        Plan your Day
      </Heading>
      <DayHolder day="Monday" dayOfTheMonth="24" month="dec" />
    </Stack>
  </Layout>
);

export default IndexPage;
