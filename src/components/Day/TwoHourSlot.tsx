import { Flex } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { theme } from '../../../theme';
import { Tooltip } from '../Plan';
type TwoHourSlotProps = {
  slot: string;
  filled: boolean;
};

export const TwoHourSlot = ({ slot, filled }: TwoHourSlotProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Flex
      background={filled ? theme.colors.yellow[200] : theme.colors.green[200]}
      position="relative"
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
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
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
