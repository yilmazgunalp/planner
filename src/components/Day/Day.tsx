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
  { gridColumnStart: '1', gridColumnEnd: '7', filled: false },
  { gridColumnStart: '7', gridColumnEnd: '9', filled: false },
  { gridColumnStart: '9', gridColumnEnd: '14', filled: false },
  { gridColumnStart: '14', gridColumnEnd: '18', filled: false },
  { gridColumnStart: '18', gridColumnEnd: '21', filled: false },

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
    move,
    slot,
    rightHandler,
    leftHandler,
    initialSlot,
    leftOrRight,
    leftOrRightHandler,
    // @ts-ignore
  ] = useResize(ref);

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
    //Thank you typescript lefttoright might be undefined?? causing bugss
    if (slot !== undefined && initialSlot !== undefined && leftOrRight !== undefined) {
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

  useEffect(() => {
    setLocalStorage({ ...plans, [storageKey]: slots });
  }, [slots]);

  useEffect(() => {
    setSlots(plans[storageKey] || defaultSlots);
  }, [storageKey]);

  return (
    <Stack flexGrow={1}>
      <TimeLabels slots={slots}></TimeLabels>
      <Box paddingX="15px" style={{ marginTop: '4px' }}>
         {/* 
  // @ts-ignore */}
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
        const resizedSlot = resizeSlot(
          +resized.gridColumnStart,
          end,
          resized.activity
        );
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
