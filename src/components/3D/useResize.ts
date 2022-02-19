import { MutableRefObject, useState, useCallback } from 'react';

export const useResize = (ref: MutableRefObject<HTMLDivElement>) => {
  const [mousePosition, setMousePosition] = useState(0);
  // REthink this slot slot can be determined from start no need to read e.target
  const [slot, setSlot] = useState<string>();

  const rightHandler = useCallback((e: React.MouseEvent, slot: number) => {
    e.preventDefault();
    e.stopPropagation();

    const onMouseMove = (e: MouseEvent) => {
      e.stopPropagation();
      console.log(e.offsetX, e.target);
      setMousePosition(e.offsetX);

      setSlot(prev => e.target.getAttribute('data-index') || prev);
      if (e.target.getAttribute('data-filled') === 'true') {
        onMouseUp();
      }
      // const offset = e.offsetX;
      // if (offset < 8) {
      //   return;
      // } else {
      //   setBoxWidth(prev => {
      //     const left = offset < prev;
      //     if (left) {
      //       if (prev - offset > 45) {
      //         return prev - 40;
      //       }
      //       return prev;
      //     } else {
      //       if (offset - (300 + prev / 2) > 45) {
      //         console.log('yeh', prev);
      //         return prev + 40;
      //       } else if (offset < 61) {
      //         return 60;
      //       }
      //       return prev;
      //     }
      //   });
      // }
    };
    function onMouseUp() {
      e.stopPropagation();
      if (ref) {
        ref.current.removeEventListener('mousemove', onMouseMove);
        ref.current.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mouseup', onMouseUp);
      }
    }
    ref.current.addEventListener('mousemove', onMouseMove);
    ref.current.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  return [mousePosition, slot, rightHandler] as const;
};
