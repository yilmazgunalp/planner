import { MutableRefObject, useState, useCallback } from 'react';

export const useResize = (ref: MutableRefObject<HTMLDivElement>) => {
  const [move, setMove] = useState(0);
  const [slot, setSlot] = useState<string>();
  const [initialSlot, setInitalSlot] = useState<number>();
  const [toleftOrToRight, setToLeftOrToRight] = useState<'left' | 'right'>();
  const [leftOrRightHandler, setleftOrRightHandler] = useState<
    'left-handler' | 'right-handler'
  >();

  const rightHandler = useCallback((e: React.MouseEvent, slot: number) => {
    e.preventDefault();
    e.stopPropagation();
    setleftOrRightHandler('right-handler');
    setInitalSlot(slot);
    const onMouseMove = (e: MouseEvent) => {
      // 1.calculate leftOrRight
      const isToRight =
        (<HTMLDivElement>e.target).dataset?.index !== undefined && (+((<HTMLDivElement>e.target).dataset.index ?? 0) > slot);
      // TODO if index is not present will be false which is not quite right
      setToLeftOrToRight(isToRight ? 'right' : 'left');

      // 2.calculate move
      const move = isToRight
        ? Math.floor(e.offsetX / 25)
        : Math.floor(
            -((<HTMLDivElement>e.target).offsetWidth / 25 - Math.floor(e.offsetX / 25) - 1)
          );
      setMove(move);
      setSlot((<HTMLDivElement>e.target).getAttribute('data-index') ?? undefined);
      // 3.stop mouse event at limit
      if ((isToRight && (<HTMLDivElement>e.target).dataset.filled === 'true') || move === -3) {
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

  const leftHandler = useCallback((e: React.MouseEvent, slot: number) => {
    e.preventDefault();
    e.stopPropagation();
    setleftOrRightHandler('left-handler');
    setInitalSlot(slot);
    const onMouseMove = (e: MouseEvent) => {
      // 1.calculate leftOrRight
      const isToLeft =
      // This is causing issue???
      (<HTMLDivElement>e.target).dataset.index !== undefined && (+((<HTMLDivElement>e.target).dataset.index ?? 0) < slot);
      // TODO if index is not present will be false which is not quite right
      setToLeftOrToRight(isToLeft ? 'left' : 'right');

      const leftMove =
      (<HTMLDivElement>e.target).offsetWidth > 25
          ? Math.floor(
            (<HTMLDivElement>e.target).offsetWidth / 25 - Math.floor(e.offsetX / 25) - 1
            )
          : // this is to register a move on borders between two slots
          e.offsetX < 7
          ? 1
          : 0;

      // 2.calculate move
      const move = isToLeft ? leftMove : -Math.floor(e.offsetX / 25);

      setMove(move);
      setSlot((<HTMLDivElement>e.target).dataset.index);

      // 3.stop mouse event at limit
      if (
        (isToLeft && (<HTMLDivElement>e.target).dataset.filled === 'true') ||
        ((<HTMLDivElement>e.target).dataset.filled === 'true' && (<HTMLDivElement>e.target).offsetWidth === 25)
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
    move,
    slot,
    rightHandler,
    leftHandler,
    initialSlot,
    toleftOrToRight,
    leftOrRightHandler,
  ] as const;
};
