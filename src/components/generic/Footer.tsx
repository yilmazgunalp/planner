import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

export const Footer = () => (
  <Flex
    as="footer"
    columnGap="1"
    alignItems="baseline"
    justifyContent="flex-end"
    style={{ marginTop: '8rem' }}
  >
    <Text fontSize="xs">built by</Text>
    <a href="https://twitter.com/webdevos" target="_blank" rel="author">
      <Text fontSize="xs" color="turquoise">
        @WebDevOs
      </Text>
    </a>
  </Flex>
);
