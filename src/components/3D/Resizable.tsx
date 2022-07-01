import { Box, Flex } from '@chakra-ui/layout';
import React, { MouseEvent, ReactNode } from 'react';
import { ResizeHandle } from './ResizeHandle';

type ResizeableProps = {
  children: ReactNode;
  onRightResize?: (e: MouseEvent, slot: number) => void;
  onLeftResize?: (e: MouseEvent, slot: number) => void;
  slotIndex: number;
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
    slotIndex,
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
      {leftHandle && <ResizeHandle onLeftResize={onLeftResize} slotIndex={slotIndex}/>
        }
      {children}
      {rightHandle && (
        <Box
          position="absolute"
          background="none"
          right="0"
          width="6px"
          height="100%"
          // data-index={slotIndex} //I think this is not needed
          onMouseDown={e => onRightResize && onRightResize(e, slotIndex)}
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
