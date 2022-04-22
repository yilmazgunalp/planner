import React, { ReactNode, useRef, useState, useEffect } from 'react';

import styles from './Day.module.css';
import Resizeable from 'components/3D/Resizable';
import { TwoHourSlot } from './TwoHourSlot';
import { TimeLabels } from './TimeLabels';
import { useResize } from 'components/3D/useResize';
import { Box, Stack } from '@chakra-ui/layout';

export type Slot = {
  gridColumnStart: string;
  gridColumnEnd: string;
  filled: boolean;
};

export const Day = () => {
  const [slots, setSlots] = useState<Slot[]>([
    { gridColumnStart: '1', gridColumnEnd: '7', filled: true },
    { gridColumnStart: '7', gridColumnEnd: '9', filled: false },
    { gridColumnStart: '9', gridColumnEnd: '14', filled: false },
    { gridColumnStart: '14', gridColumnEnd: '18', filled: true },
    { gridColumnStart: '18', gridColumnEnd: '21', filled: false },

    { gridColumnStart: '21', gridColumnEnd: '25', filled: true },
  ]);
  const ref = useRef<HTMLDivElement>();
  const [
    move,
    slot,
    rightHandler,
    leftHandler,
    initialSlot,
    leftOrRight,
    leftOrRightHandler,
  ] = useResize(ref);

  useEffect(() => {
    if (slot !== undefined && initialSlot !== undefined) {
      setSlots(
        updateSlots(
          move,
          +slot,
          slots,
          initialSlot,
          leftOrRight,
          leftOrRightHandler
        )
      );
    }
  }, [move, slot]);
  return (
    <Stack flexGrow={1}>
      <TimeLabels slots={slots}></TimeLabels>
      <Box paddingX="15px" style={{ marginTop: '4px' }}>
        <div className={styles.day} ref={ref}>
          {slots.map((slot, index) => (
            <Resizeable
              onRightResize={rightHandler}
              onLeftResize={leftHandler}
              leftHandle={slot.filled && index !== 0}
              rightHandle={slot.filled && index !== slots.length - 1}
              slot={index}
              {...slot}
            >
              <TwoHourSlot
                slot={index.toString()}
                start={slot.gridColumnStart}
                filled={slot.filled}
              />
            </Resizeable>
          ))}
        </div>
      </Box>
    </Stack>
  );
};

const resizeSlot = (start: number, end: number): Slot => {
  return {
    gridColumnStart: start.toString(),
    gridColumnEnd: end.toString(),
    filled: true,
  };
};

const refillWithSlots = (start: number, limit: number): Slot[] => {
  const result: Slot[] = [];
  let inComplete = true;
  while (inComplete) {
    if (start === limit) break;
    if (start + 4 <= limit) {
      result.push({
        gridColumnStart: start.toString(),
        gridColumnEnd: (start + 4).toString(),
        filled: false,
      });
      start += 4;
      continue;
    } else if (start < limit) {
      result.push({
        gridColumnStart: start.toString(),
        gridColumnEnd: limit.toString(),
        filled: false,
      });
      inComplete = false;
    }
  }
  return result;
};

const getBeginingAndEndingForRightHandler = (
  slots: Slot[],
  slot: number
): Slot[][] => {
  const begining = slots.slice(0, slot);
  const nextFilledItemIndex = slots.slice(slot + 1).findIndex(e => e.filled);
  const ending =
    nextFilledItemIndex === -1
      ? []
      : slots.slice(nextFilledItemIndex + slot + 1);

  return [begining, ending];
};

const updateSlots = (
  move: number,
  slot: number,
  slots: Slot[],
  initialSlot: number,
  leftOrRight: 'left' | 'right',
  leftOrRightHandler
): Slot[] => {
  if (leftOrRightHandler === 'right-handler') {
    if (move !== 0) {
      // get the begining and ending
      const [begining, ending] = getBeginingAndEndingForRightHandler(
        slots,
        initialSlot
      );

      // get the next full slot's index
      const nextFilledItemIndex = slots
        .slice(initialSlot + 1)
        .findIndex(e => e.filled);

      // limit to resize
      // TODO move to helper function
      let limit;
      if (leftOrRight === 'right') {
        limit =
          nextFilledItemIndex === -1
            ? 25
            : +slots[nextFilledItemIndex + slot].gridColumnStart;
      } else {
        limit =
          nextFilledItemIndex === -1
            ? 25
            : +slots[nextFilledItemIndex + slot + 1].gridColumnStart;
      }
      // calculate the new end
      const result: Slot[] = [];
      const resized = slots[initialSlot];
      const newEnd = move + +resized.gridColumnEnd;
      const end = newEnd <= limit ? newEnd : undefined;
      // end might be undefined because of crazy mouse events.
      // if so just dont do anything
      if (end) {
        const resizedSlot = resizeSlot(+resized.gridColumnStart, end);
        result.push(resizedSlot);
        const refilledSlots = refillWithSlots(end, limit);
        return begining.concat(result, refilledSlots, ending);
      } else {
        return slots;
      }
    }
  } else {
    if (move !== 0) {
      const reversed = slots.reduceRight<Slot[]>((acc, cur) => {
        acc.push(cur);
        return acc;
      }, []) as any;
      // get the begining and ending
      const ending =
        leftOrRight === 'right'
          ? reversed.slice(0, slots.length - 1 - slot)
          : reversed.slice(0, slots.length - 1 - slot - 1);
      const nextFilledItemIndex = reversed
        .slice(slots.length - 1 - initialSlot + 1)
        .findIndex(e => e.filled);
      const previousFilledItemIndex = slots
        .map(e => e.filled)
        .slice(0, slot)
        .lastIndexOf(true);

      const begining =
        nextFilledItemIndex === -1
          ? []
          : slots.slice(0, previousFilledItemIndex + 1);

      // limit to resize
      // TODO move to helper function
      const limit = begining.length
        ? +begining[begining.length - 1].gridColumnEnd
        : 1;

      // calculate the new end
      const result: Slot[] = [];
      const resized =
        leftOrRight === 'right'
          ? reversed[slots.length - 1 - slot]
          : reversed[slots.length - 1 - slot - 1];

      const newStart = +resized.gridColumnStart - move;
      const start = newStart >= limit ? newStart : undefined;

      // start might be undefined because of crazy mouse events.
      // if so just dont do anything
      if (start) {
        const resizedSlot = resizeSlot(start, +resized.gridColumnEnd);
        result.push(resizedSlot);
        const refilledSlots = refillWithSlots(limit, start);

        return begining.concat(refilledSlots, result, ending.reverse());
      } else {
        return slots;
      }
    }
  }
  return slots;
};
