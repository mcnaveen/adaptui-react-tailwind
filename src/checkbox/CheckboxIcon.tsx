import { createComponent, createHook } from "reakit-system";
import { cx } from "@renderlesskit/react";

import { BoxHTMLProps, BoxOptions, useBox } from "../box";
import { useTheme } from "../theme";
import { tcm } from "../utils";

import { CHECKBOX_ICON_KEYS } from "./__keys";
import { CheckboxStateReturn } from "./CheckboxState";

export type CheckboxIconOptions = BoxOptions &
  Pick<
    CheckboxStateReturn,
    "isChecked" | "isIndeterminate" | "isUnchecked" | "size"
  >;

export type CheckboxIconHTMLProps = BoxHTMLProps;

export type CheckboxIconProps = CheckboxIconOptions & CheckboxIconHTMLProps;

export const useCheckboxIcon = createHook<
  CheckboxIconOptions,
  CheckboxIconHTMLProps
>({
  name: "CheckboxIcon",
  compose: useBox,
  keys: CHECKBOX_ICON_KEYS,

  useProps(options, htmlProps) {
    const { isChecked, isIndeterminate, isUnchecked, size } = options;
    const { className: htmlClassName, ...restHtmlProps } = htmlProps;

    const checkbox = useTheme("checkbox");
    const className = cx(
      checkbox.icon.base,
      checkbox.icon.size[size],
      isUnchecked
        ? tcm(
            checkbox.icon.unChecked.default,
            checkbox.icon.unChecked.hover,
            checkbox.icon.unChecked.active,
            checkbox.icon.unChecked.focus,
            checkbox.icon.unChecked.disabled,
          )
        : "",
      isChecked
        ? tcm(
            checkbox.icon.checked.default,
            checkbox.icon.checked.hover,
            checkbox.icon.checked.active,
            checkbox.icon.checked.focus,
            checkbox.icon.checked.disabled,
          )
        : "",
      isIndeterminate
        ? tcm(
            checkbox.icon.checked.default,
            checkbox.icon.indeterminate.hover,
            checkbox.icon.indeterminate.active,
            checkbox.icon.indeterminate.focus,
            checkbox.icon.indeterminate.disabled,
          )
        : "",
      htmlClassName,
    );

    return { className, ...restHtmlProps };
  },
});

export const CheckboxIcon = createComponent({
  as: "span",
  memo: true,
  useHook: useCheckboxIcon,
});
