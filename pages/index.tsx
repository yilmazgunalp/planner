import Link from 'next/link';
import Layout from 'components/Layout';

import Resizable from 'components/3D/Resizable';
import { SplitView } from 'components/3D/SplitView';
import { Flex, Spacer, Text } from '@chakra-ui/react';
import { Day, DayLabel, TwoHourSlot } from 'components/Day';

const IndexPage = () => (
  <Layout title="School Holidays Planner">
    <h1>Hello Next.js 👋</h1>
    <Flex padding="24" width="container.xl">
      <Resizable>
        <Text textAlign="center">Hello</Text>
      </Resizable>
    </Flex>
    <Flex background="grey">
      <DayLabel day="Monday" dayOfTheMonth="24" month="dec" />
    </Flex>
    <Flex width="600px" height="58px" margin="24">
      <Day></Day>
    </Flex>
  </Layout>
);

export default IndexPage;
