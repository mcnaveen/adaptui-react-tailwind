import { createComponent, createHook } from "reakit-system";
import {
  SliderThumbHTMLProps,
  SliderThumbOptions,
  useSliderThumb,
} from "@renderlesskit/react";

import { BoxHTMLProps, BoxOptions, useBox } from "../box";
import { useTheme } from "../theme";
import { cx } from "../utils";

import { SLIDER_THUMB_CONTAINER_KEYS } from "./__keys";
import { SliderThumbStateReturn } from "./SliderThumbState";

export type SliderThumbContainerOptions = BoxOptions &
  SliderThumbOptions &
  Pick<SliderThumbStateReturn, "sliderState" | "index" | "size"> & {};

export type SliderThumbContainerHTMLProps = BoxHTMLProps & SliderThumbHTMLProps;

export type SliderThumbContainerProps = SliderThumbContainerOptions &
  SliderThumbContainerHTMLProps;

export const useSliderThumbContainer = createHook<
  SliderThumbContainerOptions,
  SliderThumbContainerHTMLProps
>({
  name: "SliderThumbContainer",
  compose: [useBox, useSliderThumb],
  keys: SLIDER_THUMB_CONTAINER_KEYS,

  useProps(options, htmlProps) {
    const { sliderState, size } = options;
    const { baseState } = sliderState;
    const { isDisabled } = baseState;
    const { className: htmlClassName, ...restHtmlProps } = htmlProps;

    const theme = useTheme("slider");
    const className = cx(
      theme.thumb.container.base.normal,
      theme.thumb.container.base.size[size],
      isDisabled
        ? theme.thumb.container.disabled
        : theme.thumb.container.normal,
      htmlClassName,
    );

    // For removing the tabIndex from the thumb container caused by Tooltip
    return { className, ...restHtmlProps, tabIndex: -1 };
  },
});

export const SliderThumbContainer = createComponent({
  as: "div",
  memo: true,
  useHook: useSliderThumbContainer,
});
