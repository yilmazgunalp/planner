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
          left="0"
          width="6px"
          height="100%"
          background="brown"
          data-index={slot}
          onMouseDown={e => onLeftResize(e, slot)}
          css={{ cursor: 'w-resize' }}
        />
      )}
      {children}
      {rightHandle && (
        <Box
          position="absolute"
          right="0"
          width="6px"
          height="100%"
          background="black"
          data-index={slot}
          onMouseDown={e => onRightResize(e, slot)}
          css={{ cursor: 'e-resize' }}
        />
      )}
    </Flex>
  );
};
export default Resizeable;
