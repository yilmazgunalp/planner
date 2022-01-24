import { Box, Flex } from '@chakra-ui/layout'
import * as React from 'react'
import { useRef, useState } from 'react'

const Resizeable = ({ children }) => {
  const ref = useRef<HTMLDivElement>()
  const [boxWidth, setBoxWidth] = useState(60)

  const handler: React.MouseEventHandler<HTMLDivElement> = (
    e: React.MouseEvent
  ) => {
    e.stopPropagation()

    const onMouseMove = (e: MouseEvent) => {
      e.stopPropagation()
      const offset = e.offsetX
      if (offset < 8) {
        return
      } else {
        setBoxWidth(prev => {
          const left = offset < prev
          if (left) {
            if (prev - offset > 45) {
              return prev - 40
            }
            return prev
          } else {
            if (offset - prev > 45) {
              return prev + 40
            } else if (offset < 61) {
              return 60
            }
            return prev
          }
        })
      }
    }
    function onMouseUp() {
      e.stopPropagation()

      ref.current.removeEventListener('mousemove', onMouseMove)
      ref.current.removeEventListener('mouseup', onMouseUp)
    }
    ref.current.addEventListener('mousemove', onMouseMove)
    ref.current.addEventListener('mouseup', onMouseUp)
  }

  return (
    <Flex ref={ref} width="350px" height="30px" background="khaki">
      <Box width={`${boxWidth}px`} background="black" pointerEvents="none">
        {children}
      </Box>
      <Box
        width="8px"
        height="30px"
        background="WindowFrame"
        onMouseDown={handler}
        css={{ cursor: 'e-resize' }}
      />
    </Flex>
  )
}
export default Resizeable
