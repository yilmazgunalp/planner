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
    if (slot && initialSlot) {
      setSlots(updateSlots(move, +slot, slots, initialSlot, leftOrRight));
    }
  }, [move, slot]);

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

const getBeginingandEnding = (slots: Slots, slot: number): Slot[][] => {
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
  slots: Slots,
  initialSlot: number,
  leftOrRight: 'left' | 'right'
): Slots => {
  //TODO figure out if logic for righthandler vs lefthandler
  if (true) {
    if (move !== 0) {
      // get the begining and ending
      const [begining, ending] = getBeginingandEnding(slots, initialSlot);

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
    const toLeft = slot < initialSlot;
    console.log('toLeft', toLeft);
    console.log('move', move);
    if (!toLeft) return slots;
    if (move > 0) {
      // get the slots after the resized slot
      const ending = slots.slice(initialSlot + 1);
      console.log('ending', slot, ending);
      // get the previous full slot's index
      const previousFilledItemIndex = slots
        .map(e => e.filled)
        .slice(0, slot + 1)
        .lastIndexOf(true);
      console.log('previousfilled', previousFilledItemIndex);
      // limit to resize
      const initialSlotIsFilled = previousFilledItemIndex === initialSlot;
      const limit =
        previousFilledItemIndex === -1
          ? 1
          : initialSlotIsFilled
          ? +slots[initialSlot].gridColumnStart + 1
          : +slots[previousFilledItemIndex].gridColumnEnd;
      console.log('limit', limit);
      // get the slots before the previousfilled(including) slot
      const begining =
        limit === 1
          ? []
          : slots.slice(
              0,
              initialSlotIsFilled ? initialSlot : previousFilledItemIndex + 1
            );
      console.log('beginning', begining);
      // resize the selected
      const result = [];
      // console.log('here', slot, slots, move, initialSlot);
      const resized = { ...slots[initialSlot] };

      let newStart = +resized.gridColumnStart - move;

      let start = newStart >= limit ? newStart : undefined;
      start && (resized.gridColumnStart = start.toString());
      console.log('here', resized, slot);
      let inComplete = true;
      let limitStart = limit;
      while (start && inComplete) {
        console.log('while', limitStart);
        if (start === limitStart) break;
        if (limitStart + 4 <= start) {
          console.log('while2');

          result.push({
            gridColumnStart: limitStart.toString(),
            gridColumnEnd: (limitStart + 4).toString(),
          });
          limitStart += 4;
          continue;
        } else if (limitStart < start) {
          console.log('while3');

          result.push({
            gridColumnStart: limitStart.toString(),
            gridColumnEnd: start.toString(),
          });
          inComplete = false;
        }
        console.log('while4');
      }
      console.log('outside while', result);
      result.push(resized);

      return begining.concat(result, ending);
    }
  }
  return slots;
};
