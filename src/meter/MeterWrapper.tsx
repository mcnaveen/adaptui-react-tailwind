import { createComponent, createHook } from "reakit-system";
import {
  MeterHTMLProps as ReakitMeterHTMLProps,
  MeterOptions as ReakitMeterOptions,
  useMeter as useReakitMeter,
} from "@renderlesskit/react";

import { BoxHTMLProps, BoxOptions, useBox } from "../box";
import { useTheme } from "../theme";
import { cx } from "../utils";

import { METER_BAR_KEYS } from "./__keys";
import { MeterStateReturn } from "./MeterState";

export type MeterWrapperOptions = BoxOptions &
  ReakitMeterOptions &
  Pick<MeterStateReturn, "baseId" | "label"> & {};

export type MeterWrapperHTMLProps = BoxHTMLProps & ReakitMeterHTMLProps & {};

export type MeterWrapperProps = MeterWrapperOptions & MeterWrapperHTMLProps;

export const useMeterWrapper = createHook<
  MeterWrapperOptions,
  MeterWrapperHTMLProps
>({
  name: "MeterWrapper",
  compose: [useBox, useReakitMeter],
  keys: METER_BAR_KEYS,

  useProps(options, htmlProps) {
    const { baseId, label } = options;
    const { className: htmlClassName, ...restHtmlProps } = htmlProps;

    const theme = useTheme("meter");
    const className = cx(theme.wrapper, htmlClassName);

    const ariaLabel = label
      ? { "aria-labelledby": baseId }
      : { "aria-label": "meter" };

    return { ...ariaLabel, className, ...restHtmlProps };
  },
});

export const MeterWrapper = createComponent({
  as: "div",
  memo: true,
  useHook: useMeterWrapper,
});