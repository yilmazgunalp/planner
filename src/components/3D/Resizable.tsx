import { Box, Flex } from '@chakra-ui/layout';
import React, { MouseEvent, ReactNode } from 'react';

type ResizeableProps = {
  children: ReactNode;
  onRightResize?: (e: MouseEvent, slot: number) => void;
  onLeftResize?: (e: MouseEvent, slot: number) => void;
  slot: number;
  gridColumnStart: string;
  gridColumnEnd: string;
  leftHandle: boolean;
  rightHandle: boolean;
};
const Resizeable = (props: ResizeableProps) => {
  const {
    children,
    onRightResize,
    onLeftResize,
    slot,
    gridColumnStart,
    gridColumnEnd,
    leftHandle,
    rightHandle,
  } = props;

  return (
    <Flex
      position="relative"
      gridColumn={`${gridColumnStart} / ${gridColumnEnd}`}
    >
      {leftHandle && (
        <Box
          position="absolute"
          background="none"
          left="0"
          width="6px"
          height="100%"
          data-index={slot}
          onMouseDown={e => onLeftResize && onLeftResize(e, slot)}
          css={{
            cursor: 'w-resize',
            '&:hover': {
              background: 'blue',
            },
          }}
        />
      )}
      {children}
      {rightHandle && (
        <Box
          position="absolute"
          background="none"
          right="0"
          width="6px"
          height="100%"
          data-index={slot}
          onMouseDown={e => onRightResize && onRightResize(e, slot)}
          css={{
            cursor: 'e-resize',
            '&:hover': {
              background: 'green',
            },
          }}
        />
      )}
    </Flex>
  );
};
export default Resizeable;
