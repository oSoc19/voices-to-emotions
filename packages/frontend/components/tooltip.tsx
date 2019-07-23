import React from 'react';
import styled from '@emotion/styled';
import TooltipTrigger from 'react-popper-tooltip';

export const TooltipContainer = styled.div`
  background: #ffffff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  max-width: 50vw;
`;

export const Tooltip = ({ children, tooltip, hideArrow, ...props }) => (
  <TooltipTrigger
    {...props}
    tooltip={({ tooltipRef, getTooltipProps }) => (
      <TooltipContainer
        {...getTooltipProps({
          ref: tooltipRef
        })}
      >
        {tooltip}
      </TooltipContainer>
    )}
  >
    {({ getTriggerProps, triggerRef }) => (
      <span
        {...getTriggerProps({
          ref: triggerRef
        })}
      >
        {children}
      </span>
    )}
  </TooltipTrigger>
);
