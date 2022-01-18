import { Box, Flex } from '@chakra-ui/layout';
import * as React from 'react'
import { useRef, useState, useCallback, createRef } from 'react';
import useMousePosition from './useMouseMove'
import {useDebounce} from 'rooks';



const Resizeable = ({children }) => {
  const ref = useRef<HTMLDivElement>();
  const [boxWidth, setBoxWidth] = useState(60);


  const handler = useCallback(() => {
    function onMouseMove(e) {
    console.log(e.offsetX)

      if(e.offsetX - boxWidth > 40) {
    setBoxWidth(e.offsetX)
      }
    }
    function onMouseUp() {
      ref.current.removeEventListener("mousemove", onMouseMove);
      ref.current.removeEventListener("mouseup", onMouseUp);
    }
    ref.current.addEventListener("mousemove", onMouseMove);
    ref.current.addEventListener("mouseup", onMouseUp);
  }, []);


  
 
console.log("render", boxWidth, ref.current)
  return (<Flex ref={ref}   width='350px' height='30px'  background='khaki'  >
    <Box width={`${boxWidth}px`} background='aqua' pointerEvents='none'>{children}</Box>
    <Box width='8px' height='30px' background='WindowFrame' onMouseDown={handler}></Box>
  </Flex>
)
  }
export default Resizeable;
