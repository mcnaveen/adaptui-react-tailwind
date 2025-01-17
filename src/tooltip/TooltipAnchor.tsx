import React, { MouseEvent } from "react";
import {
  TooltipAnchorOptions as TooltipAnchorAriakitOptions,
  useTooltipAnchor as useTooltipAnchorAriakit,
} from "ariakit";
import { useEvent } from "ariakit-utils";
import { createElement, createHook } from "ariakit-utils/system";
import { As, Props } from "ariakit-utils/types";

import { BoxOptions, useBox } from "../box";
import { useMediaQuery, usePrevious } from "../hooks";
import { createComponent } from "../utils";

import { TooltipUIProps } from "./TooltipProps";

export const useTooltipAnchor = createHook<TooltipAnchorOptions>(
  ({
    state,
    anchor,
    content,
    withArrow,
    prefix,
    suffix,
    isDragging,
    ...props
  }) => {
    if (!state) return props;

    const { visible, hide, show } = state;
    const [isMobile] = useMediaQuery("(max-width: 640px)");
    const [hasMouseLeft, setHasMouseLeft] = React.useState(false);
    const wasDragging = usePrevious(isDragging);

    React.useEffect(() => {
      if (isMobile) {
        if (!isDragging && wasDragging && visible) hide();
      } else {
        if (hasMouseLeft && !isDragging && wasDragging && visible) hide();
      }

      if (isDragging && !visible) show();
    }, [hide, wasDragging, isDragging, hasMouseLeft, visible, isMobile, show]);

    const onMouseEnterProp = props.onMouseEnter;

    const onMouseEnter = useEvent((event: MouseEvent<HTMLDivElement>) => {
      onMouseEnterProp?.(event);
      if (event.defaultPrevented) return;

      setHasMouseLeft(false);
    });

    const onMouseLeaveProp = props.onMouseLeave;

    const onMouseLeave = useEvent((event: MouseEvent<HTMLDivElement>) => {
      event.defaultPrevented = true;
      onMouseLeaveProp?.(event);

      !isDragging && hide?.();
      setHasMouseLeft(true);
    });

    props = { ...props, onMouseEnter, onMouseLeave };
    props = useTooltipAnchorAriakit({ state, ...props });
    props = useBox(props);

    return props;
  },
);

export const TooltipAnchor = createComponent<TooltipAnchorOptions>(props => {
  const htmlProps = useTooltipAnchor(props);

  return createElement("div", htmlProps);
}, "TooltipAnchor");

export type TooltipAnchorOptions<T extends As = any> = BoxOptions<T> &
  Omit<TooltipAnchorAriakitOptions<T>, "state"> &
  Partial<TooltipUIProps> & {};

export type TooltipAnchorProps<T extends As = any> = Props<
  TooltipAnchorOptions<T>
>;
