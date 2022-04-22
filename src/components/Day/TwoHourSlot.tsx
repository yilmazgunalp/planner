import { Flex } from '@chakra-ui/layout';
import { PlanContext } from 'components/Plan/planContext';
import React, { useContext, useState } from 'react';
import { theme } from '../../../theme';
import { Tooltip } from '../Plan';
type TwoHourSlotProps = {
  slot: string;
  filled: boolean;
  start: string;
};

export const TwoHourSlot = ({ slot, filled, start }: TwoHourSlotProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { onOpen } = useContext(PlanContext);
  if (!onOpen) throw new Error('need a plan Stan!');

  return (
    <Flex
      background={filled ? theme.colors.yellow[200] : theme.colors.green[200]}
      width="100%"
      height="58px"
      borderRadius={theme.radii.xl}
      className="hello"
      data-index={slot}
      data-filled={filled}
      css={
        filled
          ? {
              '&:hover': {
                background: 'rgba(250, 240, 137, 0.75)',
              },
            }
          : {
              '&:hover': {
                cursor: 'crosshair',
              },
            }
      }
      onClick={() => onOpen(start)}
      onMouseEnter={e => {
        e.stopPropagation();
        filled && setShowTooltip(true);
      }}
      onMouseLeave={e => {
        e.stopPropagation();
        filled && setShowTooltip(false);
      }}
    >
      {showTooltip && filled && (
        <Tooltip
          title="Kayaking in Sholhaven River"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        ></Tooltip>
      )}
    </Flex>
  );
};
