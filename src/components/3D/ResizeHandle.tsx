
import { Box, Flex } from '@chakra-ui/layout';
import React, { MouseEvent, ReactNode } from 'react';

type Props = {
    onRightResize?: (e: MouseEvent, slot: number) => void;
    onLeftResize?: (e: MouseEvent, slot: number) => void;
    slotIndex: number;
    leftHandle?: boolean;
    rightHandle?: boolean;
  };

export const ResizeHandle = (props: Props) => {
    const {
        onLeftResize,
        slotIndex,
      } = props;
    return (
<Box
          position="absolute"
          background="none"
          left="0"
          width="6px"
          height="100%"
          // data-index={slotIndex}
          onMouseDown={e => onLeftResize && onLeftResize(e, slotIndex)}
          css={{
            cursor: 'w-resize',
            '&:hover': {
              background: 'blue',
            },
          }}
        />

        );
};