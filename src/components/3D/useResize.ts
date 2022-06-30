import { MutableRefObject, useState, useCallback } from 'react';

// Each slot is 100px or 4 units(4x25)
const UNIT = 25;
const calculateMoveUnits = (offsetX: number) => Math.floor(offsetX / UNIT);

export const useResize = (ref: MutableRefObject<HTMLDivElement>) => {
  const [offset, setOffset] = useState(0);
  const [slot, setSlot] = useState<string>();
  const [initialSlot, setInitalSlot] = useState<number>();
  const [toleftOrToRight, setToLeftOrToRight] = useState<'left' | 'right' | 'unknown'>('unknown');
  const [leftOrRightHandler, setleftOrRightHandler] = useState<
    'left-handler' | 'right-handler'
  >();

  const rightHandler = useCallback((e: React.MouseEvent, initialSlot: number) => {
    e.preventDefault();
    e.stopPropagation();
    setleftOrRightHandler('right-handler');
    setInitalSlot(initialSlot);
    const onMouseMove = (e: MouseEvent) => {
      // 1.calculate leftOrRight
      const targetsDataset = (<HTMLDivElement>e.target).dataset;
      const offsetX = e.offsetX;
      let leftRight;
      if(targetsDataset?.index !== undefined) {
        leftRight = (+targetsDataset.index > initialSlot) ? 'right' : 'left'
      } else {
        leftRight = 'unknown';
      }
      setToLeftOrToRight(leftRight);
      // console.log(leftRight, e.target, targetsDataset)
     // 2.stop mouse event at filled slot or if mouse moves out of ref container
      if (leftRight === 'unknown' || (leftRight === 'right' && !!targetsDataset.filled)) { 
      //  console.log(leftRight, e.target)
      // set offset as zero to make sure no move is calculated.
       setOffset(0)
        onMouseUp();
      }
      setOffset(offsetX);
      setSlot(targetsDataset.index ?? undefined);
       
      // // 2.calculate move
      // const move = isToRight
      //   ? calculateMoveUnits(offsetX)
      //   : Math.floor(
      //       -((<HTMLDivElement>e.target).offsetWidth / UNIT - calculateMoveUnits(offsetX) - 1)
      //     );
      //     console.log((<HTMLDivElement>e.target).offsetWidth, offsetX, move, e.target)
     
    };
    function onMouseUp() {
      if (ref) {
        ref.current?.removeEventListener('mousemove', onMouseMove);
        ref.current?.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mouseup', onMouseUp);
      }
    }
    ref?.current?.addEventListener('mousemove', onMouseMove);
    ref?.current?.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  const leftHandler = useCallback((e: React.MouseEvent, initialSlot: number) => {
    e.preventDefault();
    e.stopPropagation();
    setleftOrRightHandler('left-handler');
    setInitalSlot(initialSlot);
    const onMouseMove = (e: MouseEvent) => {
      // 1.calculate leftOrRight
      const targetsDataset = (<HTMLDivElement>e.target).dataset;
      const offsetX = e.offsetX;
      const isToLeft =
      // This is causing issue???
      targetsDataset.index !== undefined && (+targetsDataset.index < initialSlot);
      // TODO if index is not present will be false which is not quite right
      setToLeftOrToRight(isToLeft ? 'left' : 'right');

      const leftMove = //hmmm??
      (<HTMLDivElement>e.target).offsetWidth > 25
          ? Math.floor(
            (<HTMLDivElement>e.target).offsetWidth / 25 - Math.floor(e.offsetX / 25) - 1
            )
          : // this is to register a move on borders between two slots
          e.offsetX < 7
          ? 1
          : 0;

      // 2.calculate move
      const move = isToLeft ?  (<HTMLDivElement>e.target).offsetWidth / 25 - Math.floor(e.offsetX / 25) - 1 : -calculateMoveUnits(offsetX);
      console.log(isToLeft,(<HTMLDivElement>e.target).offsetWidth, offsetX, move)
      // setMove(move);
      setSlot(targetsDataset.index ?? undefined);
      // 3.stop mouse event at limit
      if (
        (isToLeft && targetsDataset.filled === 'true') ||
        ((<HTMLDivElement>e.target).dataset.filled === 'true' && (<HTMLDivElement>e.target).offsetWidth === 25) //hmmm??
      ) {
        onMouseUp();
      }
    };
    function onMouseUp() {
      e.stopPropagation();
      if (ref) {
        ref.current?.removeEventListener('mousemove', onMouseMove);
        ref.current?.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mouseup', onMouseUp);
      }
    }
    ref?.current?.addEventListener('mousemove', onMouseMove);
    ref?.current?.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  return [
    offset,
    slot,
    rightHandler,
    leftHandler,
    initialSlot,
    toleftOrToRight,
    leftOrRightHandler,
  ] as const;
};
