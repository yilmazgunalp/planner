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
type Slots = Slot[];

export const Day = ({ children }: DayProps) => {
  const [slots, setSlots] = useState<Slots>([
    { gridColumnStart: '1', gridColumnEnd: '5' },
    { gridColumnStart: '5', gridColumnEnd: '9', filled: true },
    { gridColumnStart: '9', gridColumnEnd: '13' },
    { gridColumnStart: '13', gridColumnEnd: '17' },
    { gridColumnStart: '17', gridColumnEnd: '21', filled: true },
    { gridColumnStart: '21', gridColumnEnd: '25' },
  ]);
  const ref = useRef<HTMLDivElement>();
  const [position, slot, handler] = useResize(ref);

  const move = Math.floor(position / 25);

  useEffect(() => {
    console.log('here', move, slot);
    setSlots(updateSlots(move, +slot, slots));
  }, [move, slot]);

  return (
    <div className={styles.day} ref={ref}>
      {slots.map((slot, index) => (
        <Resizeable onResize={handler} slot={index} {...slot}>
          <TwoHourSlot slot={index.toString()} filled={slot.filled} />
        </Resizeable>
      ))}
    </div>
  );
};

const updateSlots = (move: number, slot: number, slots: Slots): Slots => {
  if (move > 0) {
    // get the slots before the resized slot
    const begining = slots.slice(0, slot - 1);
    console.log('begining', begining);
    // get the next full slot's index
    const nextFilledItemIndex = slots.slice(slot).findIndex(e => e.filled);
    console.log('nextfilled', nextFilledItemIndex);
    // limit to resize
    const limit =
      nextFilledItemIndex === -1
        ? 25
        : +slots[nextFilledItemIndex + slot].gridColumnStart;
    console.log('limit', limit);
    // get the slots after the nextfilled(including) slot
    const ending = limit === 25 ? [] : slots.slice(nextFilledItemIndex + slot);

    console.log('ending', ending);
    const result = [];
    const resized = slots[slot - 1];
    const newEnd = move + +resized.gridColumnEnd;
    let end = newEnd <= limit ? newEnd : undefined;
    end && (resized.gridColumnEnd = end.toString());
    result.push(resized);
    let inComplete = true;
    while (end && inComplete) {
      console.log('while');
      if (end === limit) break;
      if (end + 4 <= limit) {
        console.log('while2');

        result.push({
          gridColumnStart: end.toString(),
          gridColumnEnd: (end + 4).toString(),
        });
        end += 4;
        continue;
      } else if (end < limit) {
        console.log('while3');

        result.push({
          gridColumnStart: end.toString(),
          gridColumnEnd: limit.toString(),
        });
        inComplete = false;
      }
      console.log('while4');
    }
    console.log('outside while');

    return begining.concat(result, ending);
  }
  return slots;
};
