import { Flex } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { theme } from '../../../theme';
import { Activity, Tooltip } from '../Plan';
type TwoHourSlotProps = {
  slot: string;
  filled?: Activity;
  start: string;
  onOpen: (start: string) => void;
};

export const TwoHourSlot = ({
  slot,
  filled,
  start,
  onOpen,
}: TwoHourSlotProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

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
        <Tooltip title={filled.name} description={filled.description}></Tooltip>
      )}
    </Flex>
  );
};
