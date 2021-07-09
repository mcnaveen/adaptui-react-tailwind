import { cx } from "@renderlesskit/react";
import * as React from "react";
import {
  Button as ReakitButton,
  ButtonProps as ReakitButtonProps,
} from "reakit";
import { useTheme } from "../theme";
import { Spinner } from "../spinner";
import { Dict, forwardRefWithAs } from "../utils/types";
import { runIfFn } from "../utils";

export type NonNullable<T> = Exclude<T, null | undefined>;

export type ButtonProps = Omit<ReakitButtonProps, "prefix"> & {
  /**
   * How large should the button be?
   *
   * @default md
   */
  size?: keyof Renderlesskit.GetThemeValue<"newButton", "size">;
  /**
   * How the button should look?
   *
   * @default solid
   */
  variant?: keyof Renderlesskit.GetThemeValue<"newButton", "variant">;
  /**
   * If added, the button will only show an icon ignoring other childrens.
   */
  iconOnly?: React.ReactElement;
  /**
   * If added, the button will show an icon before the button's text.
   */
  suffix?: React.ReactElement;
  /**
   * If added, the button will show an icon before the button's text.
   */
  prefix?: React.ReactElement;
  /**
   * If `true`, the button will be disabled.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the button will show a spinner.
   *
   * @default false
   */
  loading?: boolean;
  /**
   * If added, the button will show this spinner components
   */
  spinner?: React.ReactElement;
};

export const addIconA11y = (icon: React.ReactElement, props?: Dict) => {
  console.log("%c props", "color: #408059", props);

  return React.isValidElement(icon)
    ? React.cloneElement(icon, {
        // @ts-ignore
        role: "img",
        focusable: false,
        "aria-hidden": true,
        ...props,
      })
    : icon;
};

export const Button = forwardRefWithAs<
  ButtonProps,
  HTMLButtonElement,
  "button"
>((props, ref) => {
  const {
    children,
    size = "sm",
    variant = "solid",
    iconOnly,
    suffix,
    prefix,
    loading = false,
    spinner,
    disabled = false,
    className,
    ...rest
  } = props;
  const _disabled = disabled || loading;

  const theme = useTheme();
  const {
    base,
    size: _size,
    variant: _variant,
    iconOnly: _iconOnly,
  } = theme.newButton;
  const baseStyles = cx(
    base,
    !iconOnly ? _size[size] : _iconOnly.size[size],
    _variant[variant],
    className,
  );

  return (
    <ReakitButton
      ref={ref}
      className={baseStyles}
      disabled={_disabled}
      {...rest}
    >
      {loading && !suffix && !prefix ? (
        <>
          <ButtonSpinnerWrapper>
            <ButtonSpinner spinner={spinner} iconOnly={iconOnly} size={size} />
          </ButtonSpinnerWrapper>
          <div className="opacity-0">
            <ButtonChildren
              iconOnly={iconOnly}
              suffix={suffix}
              prefix={prefix}
              size={size}
              loading={loading}
              spinner={spinner}
            >
              {children}
            </ButtonChildren>
          </div>
        </>
      ) : (
        <ButtonChildren
          iconOnly={iconOnly}
          suffix={suffix}
          prefix={prefix}
          size={size}
          loading={loading}
          spinner={spinner}
        >
          {children}
        </ButtonChildren>
      )}
    </ReakitButton>
  );
});

Button.displayName = "Button";

type ChildrenWithPrefixSuffixProps = {
  suffix?: React.ReactElement;
  prefix?: React.ReactElement;
  spinner?: React.ReactElement;
  size: NonNullable<ButtonProps["size"]>;
  loading?: boolean;
};

const ChildrenWithPrefixSuffix: React.FC<ChildrenWithPrefixSuffixProps> =
  props => {
    const { suffix, prefix, children, size, loading, spinner } = props;
    const { newButton } = useTheme();
    const { suffix: suffixStyle, prefix: prefixStyle } = newButton;
    const suffixStyles = cx(suffixStyle.size[size]);
    const prefixStyles = cx(prefixStyle.size[size]);

    return (
      <>
        {prefix ? (
          loading && !suffix ? (
            <ButtonSpinner spinner={spinner} size={size} />
          ) : (
            <>{runIfFn(addIconA11y(prefix, { className: prefixStyles }))}</>
          )
        ) : null}
        <span>{children}</span>
        {suffix ? (
          loading ? (
            <ButtonSpinner spinner={spinner} size={size} />
          ) : (
            <>{runIfFn(addIconA11y(suffix, { className: suffixStyles }))}</>
          )
        ) : null}
      </>
    );
  };

type ButtonChildrenProps = {
  iconOnly?: React.ReactElement;
  spinner?: React.ReactElement;
  suffix?: React.ReactElement;
  prefix?: React.ReactElement;
  size: NonNullable<ButtonProps["size"]>;
  loading?: boolean;
};

const ButtonChildren: React.FC<ButtonChildrenProps> = props => {
  const { children, iconOnly, suffix, prefix, size, loading, spinner } = props;

  if (iconOnly)
    // Removed ButtonIcon with span which causing small displacement
    // If the icon is only a vaid element add the required accessibility attrs
    // If they are passing a function meaning they are passing a custom icon
    // which they need to add the custom styles
    // @ts-ignore
    return <>{runIfFn(addIconA11y(iconOnly))}</>;

  return (
    <ChildrenWithPrefixSuffix
      suffix={suffix}
      prefix={prefix}
      size={size}
      loading={loading}
      spinner={spinner}
    >
      {children}
    </ChildrenWithPrefixSuffix>
  );
};

type ButtonSpinnerProps = {
  spinner?: React.ReactElement;
  iconOnly?: React.ReactElement;
  size: NonNullable<ButtonProps["size"]>;
};

const ButtonSpinner: React.FC<ButtonSpinnerProps> = props => {
  const { spinner, iconOnly, size } = props;
  const { newButton } = useTheme();
  const { spinner: spinnerStyle } = newButton;

  if (spinner) return <ButtonSpinnerWrapper>{spinner}</ButtonSpinnerWrapper>;

  const spinnerStyles = cx(
    !iconOnly ? spinnerStyle.size[size] : spinnerStyle.iconOnly.size[size],
  );

  return <Spinner className={spinnerStyles} size="em" />;
};

const ButtonSpinnerWrapper: React.FC = props => (
  <div className="absolute flex items-center justify-center" {...props} />
);
