import React, { ReactNode, useRef, useState, useEffect } from 'react';

import styles from './Day.module.css';
import Resizeable from 'components/3D/Resizable';
import { TwoHourSlot } from './TwoHourSlot';
import { useResize } from 'components/3D/useResize';

type DayProps = {
  children?: ReactNode;
  title?: string;
};
type Slot = {
  gridColumnStart: string;
  gridColumnEnd: string;
  filled?: boolean;
};
type Slots = Slot[] | [];

export const Day = ({ children }: DayProps) => {
  const [slots, setSlots] = useState<Slots>([
    { gridColumnStart: '1', gridColumnEnd: '5' },
    { gridColumnStart: '5', gridColumnEnd: '9', filled: true },
    { gridColumnStart: '9', gridColumnEnd: '13' },
    { gridColumnStart: '13', gridColumnEnd: '17' },
    { gridColumnStart: '17', gridColumnEnd: '21' },

    { gridColumnStart: '21', gridColumnEnd: '25', filled: true },
  ]);
  const ref = useRef<HTMLDivElement>();
  const [move, slot, rightHandler, leftHandler, initialSlot, leftOrRight] =
    useResize(ref);

  useEffect(() => {
    if (slot !== undefined && initialSlot !== undefined) {
      setSlots(updateSlots(move, +slot, slots, initialSlot, leftOrRight));
    }
  }, [move, slot]);
  console.log('slots', slots);
  return (
    <div className={styles.day} ref={ref}>
      {slots.map((slot, index) => (
        <Resizeable
          onRightResize={rightHandler}
          onLeftResize={leftHandler}
          slot={index}
          {...slot}
        >
          <TwoHourSlot slot={index.toString()} filled={slot.filled} />
        </Resizeable>
      ))}
    </div>
  );
};

const resizeSlot = (start: number, end: number): Slot => {
  return {
    gridColumnStart: start.toString(),
    gridColumnEnd: end.toString(),
    filled: true,
  };
};

const refillWithSlots = (start: number, limit: number): Slots => {
  let result = [];
  let inComplete = true;
  while (inComplete) {
    if (start === limit) break;
    if (start + 4 <= limit) {
      result.push({
        gridColumnStart: start.toString(),
        gridColumnEnd: (start + 4).toString(),
      });
      start += 4;
      continue;
    } else if (start < limit) {
      result.push({
        gridColumnStart: start.toString(),
        gridColumnEnd: limit.toString(),
      });
      inComplete = false;
    }
  }
  return result;
};

const getBeginingAndEndingForRightHandler = (
  slots: Slots,
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
const getBeginingAndEndingForLeftHandler = (
  slots: Slots,
  slot: number
): Slot[][] => {
  const nextFilledItemIndex = slots.slice(slot + 1).findIndex(e => e.filled);
  const ending =
    nextFilledItemIndex === -1
      ? []
      : slots.slice(nextFilledItemIndex + slot + 1);
  const previousFilledItemIndex = slots
    .map(e => e.filled)
    .slice(0, slot)
    .lastIndexOf(true);
  const begining =
    previousFilledItemIndex === -1
      ? []
      : slots.slice(0, previousFilledItemIndex + 1);

  return [begining, ending];
};

const updateSlots = (
  move: number,
  slot: number,
  slots: Slots,
  initialSlot: number,
  leftOrRight: 'left' | 'right'
): Slots => {
  //TODO figure out if logic for righthandler vs lefthandler
  if (false) {
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
      const result = [];
      const resized = slots[initialSlot];
      const newEnd = move + +resized.gridColumnEnd;
      let end = newEnd <= limit ? newEnd : undefined;
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
      const reversed = slots.reduceRight((acc, cur) => {
        acc.push(cur);
        return acc;
      }, []) as any;
      // get the begining and ending
      console.log('slots reversed', reversed);

      const ending = reversed.slice(0, slots.length - 1 - slot);
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

      console.log(
        'left-resize-bug',
        'begining ending',
        initialSlot,
        slot,
        begining,
        ending
      );

      console.log(
        'left-resize-bug',
        'nextFilledItemIndex',
        nextFilledItemIndex
      );
      // limit to resize
      // TODO move to helper function
      let limit = begining.length
        ? +begining[begining.length - 1].gridColumnEnd
        : 1;

      console.log('left-resize-bug', 'limit', limit, leftOrRight);

      // calculate the new end
      const result = [];
      const resized = reversed[slots.length - 1 - slot];
      console.log('left-resize-bug', 'resized', resized, leftOrRight);

      let newStart = +resized.gridColumnStart - move;
      let start = newStart >= limit ? newStart : undefined;

      // start might be undefined because of crazy mouse events.
      // if so just dont do anything

      console.log('left-resize-bug', 'start', start, leftOrRight);

      if (start) {
        const resizedSlot = resizeSlot(start, +resized.gridColumnEnd);
        result.push(resizedSlot);
        const refilledSlots = refillWithSlots(limit, start);
        console.log('left-resize-bug', 'refilledSlots', refilledSlots);

        return begining.concat(refilledSlots, result, ending.reverse());
      } else {
        return slots;
      }
    }
  }
  return slots;
};
