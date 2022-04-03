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
  onRightResize?: (e: MouseEvent, slot: number) => void;
  onLeftResize?: (e: MouseEvent, slot: number) => void;
  slot: number;
  gridColumnStart: string;
  gridColumnEnd: string;
};
const Resizeable = (props: ResizeableProps) => {
  // const ref = useRef<HTMLDivElement>();
  const [boxWidth, setBoxWidth] = useState(60);

  const {
    children,
    onRightResize,
    onLeftResize,
    slot,
    gridColumnStart,
    gridColumnEnd,
  } = props;

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
      {gridColumnEnd === '25' && (
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
      {/* <Box pointerEvents="none" width="100%"> */}
      {children}
      {/* </Box> */}
      {/* <Box
        position="absolute"
        right="0"
        width="6px"
        height="100%"
        background="black"
        data-index={slot}
        onMouseDown={e => onRightResize(e, slot)}
        css={{ cursor: 'e-resize' }}
      /> */}
    </Flex>
  );
};
export default Resizeable;
