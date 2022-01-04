import { createHook } from "reakit-system";
import {
  createComponent,
  SliderTrackHTMLProps,
  SliderTrackOptions,
  useSliderTrack,
} from "@renderlesskit/react";

import { BoxHTMLProps, BoxOptions, useBox } from "../box";
import { useTheme } from "../theme";
import { cx } from "../utils";

import { SLIDER_TRACK_WRAPPER_KEYS } from "./__keys";

export type SliderTrackWrapperOptions = BoxOptions & SliderTrackOptions & {};

export type SliderTrackWrapperHTMLProps = BoxHTMLProps & SliderTrackHTMLProps;

export type SliderTrackWrapperProps = SliderTrackWrapperOptions &
  SliderTrackWrapperHTMLProps;

export const useSliderTrackWrapper = createHook<
  SliderTrackWrapperOptions,
  SliderTrackWrapperHTMLProps
>({
  name: "SliderTrackWrapper",
  compose: [useBox, useSliderTrack],
  keys: SLIDER_TRACK_WRAPPER_KEYS,

  useProps(options, htmlProps) {
    const { className: htmlClassName, ...restHtmlProps } = htmlProps;

    const theme = useTheme("slider");
    const className = cx(theme.track.wrapper, htmlClassName);

    return { className, ...restHtmlProps };
  },
});

export const SliderTrackWrapper = createComponent({
  as: "div",
  memo: true,
  useHook: useSliderTrackWrapper,
});
