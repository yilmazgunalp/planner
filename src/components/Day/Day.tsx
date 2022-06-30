import React, { useRef, useState, useEffect } from 'react';

import styles from './Day.module.css';
import Resizeable from 'components/3D/Resizable';
import { TwoHourSlot } from './TwoHourSlot';
import { TimeLabels } from './TimeLabels';
import { useResize } from 'components/3D/useResize';
import { Box, Stack } from '@chakra-ui/layout';
import { useLocalstorageState } from 'rooks';
import { PlanForm, Activity } from 'components/Plan';
import { useDisclosure } from '@chakra-ui/react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

export type Slot = {
  gridColumnStart: string;
  gridColumnEnd: string;
  filled: boolean;
  activity?: Activity;
};

const defaultSlots = [
  { gridColumnStart: '1', gridColumnEnd: '5', filled: false },
  { gridColumnStart: '5', gridColumnEnd: '9', filled: false },
  { gridColumnStart: '9', gridColumnEnd: '13', filled: false },
  { gridColumnStart: '13', gridColumnEnd: '17', filled: false },
  { gridColumnStart: '17', gridColumnEnd: '21', filled: false },

  { gridColumnStart: '21', gridColumnEnd: '25', filled: false },
];

type Props = {
  storageKey: string;
};

export const Day = ({ storageKey }: Props) => {
  const [plans, setLocalStorage, remove] = useLocalstorageState<{
    [key: string]: Slot[];
  }>('plans', {});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editSlot, setEditSlot] = useState<string>();
  const [slots, setSlots] = useState<Slot[]>(
    plans && plans[storageKey] ? plans[storageKey] : defaultSlots
  );


  const ref = useRef<HTMLDivElement>();
  const [
    mousePosition,
    slot,
    rightHandler,
    leftHandler,
    initialSlot,
    leftOrRight,
    leftOrRightHandler,
    // @ts-ignore
  ] = useResize(ref);

  // console.log(mousePosition)

  const handleSubmit = data => {
    if (editSlot) {
      setSlots(
        slots.map(slot =>
          slot.gridColumnStart === editSlot
            ? { ...slot, activity: data, filled: true }
            : slot
        )
      );

      onClose();
    }
  };
  const handleOpenModal = (slot: string) => {
    setEditSlot(slot);
    onOpen();
  };

  useEffect(() => {
    console.log("effect", mousePosition)
    // Thank you typescript lefttoright might be undefined?? causing bugss
    if (mousePosition && slot !== undefined && initialSlot !== undefined && leftOrRight !== 'unknown')  {
      setSlots(
        updateSlots(
          mousePosition,
          +slot,
          slots,
          initialSlot,
          leftOrRight,
          leftOrRightHandler
        )
      );
    }
  }, [mousePosition, slot]);

  useEffect(() => {
    setLocalStorage({ ...plans, [storageKey]: slots });
  }, [slots]);

  useEffect(() => {
    setSlots(plans[storageKey] || defaultSlots);
  }, [storageKey]);
  // console.log("SLOTS", slots)
  return (
    <Stack flexGrow={1}>
      <TimeLabels slots={slots}></TimeLabels>
      <Box paddingX="15px" style={{ marginTop: '4px' }}>
         {/* 
  // @ts-ignore */}
        <div className={styles.day} ref={ref}>
          {slots.map((slot, index) => (
            <Resizeable
            key={slot.gridColumnStart}
              onRightResize={rightHandler}
              onLeftResize={leftHandler}
              leftHandle={slot.filled && index !== 0}
              rightHandle={slot.filled && index !== slots.length - 1}
              slotIndex={index}
              {...slot}
            >
              <TwoHourSlot
                slot={index.toString()}
                start={slot.gridColumnStart}
                // pass acitivty instead
                filled={slot.activity}
                onOpen={handleOpenModal}
              />
            </Resizeable>
          ))}
        </div>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>What will you do?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PlanForm onSubmit={handleSubmit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

const resizeSlot = (start: number, end: number, activity?: Activity): Slot => {
  return {
    gridColumnStart: start.toString(),
    gridColumnEnd: end.toString(),
    filled: true,
    activity,
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

const getBeginingAndEndingAndNextFilledForRightHandler = (
  slots: Slot[],
  slot: number
): [Slot[],Slot[], number] => {
  const begining = slots.slice(0, slot);
  const nextFilledItemIndex = slots.slice(slot + 1).findIndex(e => e.filled);
  const ending =
    nextFilledItemIndex === -1
      ? []
      : slots.slice(nextFilledItemIndex + slot + 1);

  return [begining, ending, nextFilledItemIndex];
};

// Each slot is 100px or 4 units(4x25)
const UNIT = 24; //using 24 as calculation otherwise last 25px doesn't add up to 1 unit of move
const calculateMoveUnits = (offsetX: number) => Math.floor(offsetX / UNIT);

const updateSlots = (
  offsetX: number,
  slot: number,
  slots: Slot[],
  initialSlot: number,
  leftOrRight: 'left' | 'right' | 'unknown',
  leftOrRightHandler
): Slot[] => {
  if (leftOrRightHandler === 'right-handler') {
    // console.log("RIGHTH-HANDLER", "initalslot:==>", initialSlot)
    const move = calculateMoveUnits(offsetX)
    console.log("move", move)
    if (move !== 0) {
      // 1. get the begining and ending
      const [begining, ending, nextFilledItemIndex] = getBeginingAndEndingAndNextFilledForRightHandler(
        slots,
        initialSlot
      );

      // // get the next full slot's index
      // const nextFilledItemIndex = slots
      //   .slice(initialSlot + 1)
      //   .findIndex(e => e.filled);

      // 2. limit to resize
      // TODO move to helper function
      let limit;
      // console.log("AA", nextFilledItemIndex, slots, slot)
      if (leftOrRight === 'right') {
        if(nextFilledItemIndex !== -1 && (initialSlot + nextFilledItemIndex +1 < slot) || !!slots[slot]?.filled) {
          return slots
        };
        limit =
          nextFilledItemIndex === -1
            ? 25
            : +slots[nextFilledItemIndex + initialSlot + 1]?.gridColumnStart ?? 'unknown';
      } else {
        limit =
          nextFilledItemIndex === -1
            ? 25
            : +slots[nextFilledItemIndex + slot + 1].gridColumnStart;
      }
      // console.log("limit", limit)
      // if limit can't be calculated return slots as they are
      if(limit === 'unknown') return slots;
      // 3. calculate the new end
      const result: Slot[] = [];
      const resized = slots[initialSlot];
      const newEnd = move + +resized.gridColumnEnd;
      const end = newEnd <= limit ? newEnd : undefined;
     
      if (end) {
         // 4. resize the slot and refill space between the resized slot and the limit
        const resizedSlot = resizeSlot(
          +resized.gridColumnStart,
          end,
          resized.activity
        );
        result.push(resizedSlot);
        const refilledSlots = refillWithSlots(end, limit);
        // 5. concat all the bits together to make up the slots
        return begining.concat(result, refilledSlots, ending);
      } else {
         // end might be undefined because of crazy mouse events.
      // if so just dont do anything
        return slots;
      }
    }
  } else {
    console.log("LEFT-HANDLER")

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
        const resizedSlot = resizeSlot(
          start,
          +resized.gridColumnEnd,
          resized.activity
        );
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
