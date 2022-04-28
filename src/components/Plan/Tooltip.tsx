import React from 'react';
import { Stack, Text, Heading } from '@chakra-ui/react';

type Props = {
  title: string;
  description: string;
};

export const Tooltip = ({ title, description }: Props) => (
  <Stack
    alignItems="baseline"
    justifyContent="flex-end"
    gap="none"
    pointerEvents="none"
    css={{
      position: 'absolute',
      top: 'calc(100% + 10px)',

      left: '10px',
      width: '200px',
      padding: '5px 8px 8px',
      borderRadius: '10px',
      background: '#fff',
      color: '#000',
      zIndex: '999',
      '&:before': {
        content: '""',
        position: 'absolute',
        bottom: '100%',
        border: '8px solid #000',
        borderColor: 'transparent transparent #fff transparent',
      },
    }}
  >
    <Heading fontSize="sm">{title}</Heading>
    <Text fontSize="xs" lineHeight="shorter" style={{ marginTop: '0.25rem' }}>
      {description}
    </Text>
  </Stack>
);

export default Tooltip;
