import * as React from "react";

import { getComponentProps, useSafeLayoutEffect } from "../index";
import { runIfFn, splitProps, withIconA11y } from "../utils";

import { USE_SELECT_STATE_KEYS } from "./__keys";
import { SelectOwnProps, SelectProps } from "./Select";
import { SelectPrefixProps } from "./SelectPrefix";
import { SelectInitialState, useSelectState } from "./SelectState";
import { SelectSuffixProps } from "./SelectSuffix";
import { SelectWrapperProps } from "./SelectWrapper";

export const useSelectStateSplit = (props: SelectProps) => {
  const [stateProps, selectProps] = splitProps(
    props,
    USE_SELECT_STATE_KEYS,
  ) as [SelectInitialState, SelectOwnProps];
  const state = useSelectState(stateProps);

  return [state, selectProps, stateProps] as const;
};

const componentMap = {
  SelectWrapper: "wrapperProps",
  SelectMain: "mainProps",
  SelectPrefix: "prefixProps",
  SelectSuffix: "suffixProps",
};

export const useSelectProps = (props: React.PropsWithChildren<SelectProps>) => {
  const [state, selectProps] = useSelectStateSplit(props);
  const { prefix, suffix, loading, spinner } = state;
  const { className, style, children, disabled, ...restProps } = selectProps;
  const { componentProps, finalChildren } = getComponentProps(
    componentMap,
    children,
    state,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setHasPaddingCalculated] = React.useState(false);

  const _prefix: SelectProps["prefix"] =
    componentProps?.prefixProps?.children || prefix;
  const __suffix: SelectProps["suffix"] =
    componentProps?.suffixProps?.children || suffix;
  const _suffix: SelectProps["suffix"] = React.useMemo(() => {
    return loading
      ? runIfFn(spinner, state)
      : withIconA11y(runIfFn(__suffix, state));
  }, [__suffix, loading, spinner, state]);

  const inputInlineStyles = React.useRef<Record<string, any>>({});
  const prefixRef = React.useRef<HTMLElement>(null);
  const suffixRef = React.useRef<HTMLElement>(null);

  useSafeLayoutEffect(() => {
    let key = "";

    const prefixElement = prefixRef.current;
    const suffixElement = suffixRef.current;
    if (_prefix && prefixElement) {
      key = "paddingLeft";

      if (!key) return;
      inputInlineStyles.current[key] =
        prefixElement.getBoundingClientRect().width;
    }

    if (_suffix && suffixElement) {
      key = "paddingRight";

      if (!key) return;
      inputInlineStyles.current[key] =
        suffixElement.getBoundingClientRect().width;
    }

    setHasPaddingCalculated(true);
  }, [_prefix, _suffix]);

  const wrapperProps: SelectWrapperProps = {
    ...state,
    className,
    style,
    ...componentProps.wrapperProps,
  };

  const mainProps: SelectWrapperProps = {
    ...state,
    disabled,
    ...restProps,
    style: { ...inputInlineStyles.current },
    children: finalChildren,
    ...componentProps.mainProps,
  };

  const prefixProps: SelectPrefixProps = {
    ...state,
    disabled,
    ...componentProps.prefixProps,
    ref: prefixRef,
    children: withIconA11y(runIfFn(_prefix, state)),
  };

  const suffixProps: SelectSuffixProps = {
    ...state,
    disabled,
    ...componentProps.suffixProps,
    ref: suffixRef,
    children: _suffix,
  };

  return {
    state,
    prefix: _prefix,
    suffix: _suffix,
    wrapperProps,
    mainProps,
    prefixProps,
    suffixProps,
  };
};
