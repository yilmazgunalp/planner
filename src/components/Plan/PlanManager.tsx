import React, { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { DayHolder } from 'components/Day/DayHolder';

import { PlanContext } from './planContext';
import { PlanForm } from 'components/Plan';

import { useLocalstorage } from 'rooks';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

type Props = {};

export const PlanManager = ({}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [plans, setPlans] = useState({});
  const [slot, setSlot] = useState<string>();
  const [value, set, remove] = useLocalstorage('plans', {});

  const handleOpenModal = (slot: string) => {
    setSlot(slot);
    onOpen();
  };

  const handleSubmit = data => {
    if (slot) {
      set({ ...value, [slot]: data });
      onClose();
    }
  };

  return (
    <PlanContext.Provider value={{ plans, onOpen: handleOpenModal }}>
      <DayHolder day="Monday" dayOfTheMonth="24" month="dec"></DayHolder>
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
    </PlanContext.Provider>
  );
};
