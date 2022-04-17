import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

type Props = {
  quote: string;
  by: string;
};

const Quote = ({ quote, by = 'anonymous' }: Props) => (
  <Text fontSize="xs" textAlign="center" maxWidth="64" alignSelf="center">
    {quote}
    <br />
    <Text textAlign="right">&#8212;&nbsp;{by}</Text>
  </Text>
);

export default Quote;
