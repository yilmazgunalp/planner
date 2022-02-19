import { Box, Flex } from '@chakra-ui/layout';
import React, {
  forwardRef,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useRef,
  useState,
} from 'react';

type ResizeableProps = {
  children: ReactNode;
  onResize?: (e: MouseEvent, slot: number) => void;
  slot: number;
  gridColumnStart: string;
  gridColumnEnd: string;
};
const Resizeable = (props: ResizeableProps) => {
  // const ref = useRef<HTMLDivElement>();
  const [boxWidth, setBoxWidth] = useState(60);

  const { children, onResize, slot, gridColumnStart, gridColumnEnd } = props;

  return (
    <Flex
      position="relative"
      gridColumn={`${gridColumnStart} / ${gridColumnEnd}`}
      // justifySelf="end"

      // ref={ref}
      // width="600px"
      // height="30px"
      // background="khaki"
      // justifyContent="center"
    >
      {/* <Box
        width="8px"
        height="30px"
        background="WindowFrame"
        onMouseDown={leftHandler}
        css={{ cursor: 'e-resize' }}
      /> */}
      {/* <Box pointerEvents="none" width="100%"> */}
      {children}
      {/* </Box> */}
      <Box
        position="absolute"
        right="0"
        width="6px"
        height="100%"
        background="black"
        onMouseDown={e => onResize(e, slot)}
        css={{ cursor: 'e-resize' }}
      />
    </Flex>
  );
};
export default Resizeable;
