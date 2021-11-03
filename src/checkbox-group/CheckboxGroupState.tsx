import { createContext } from "../utils";

export type CheckboxGroupState = {
  /**
   * How large should the button be?
   *
   * @default md
   */
  size: keyof Renderlesskit.GetThemeValue<"checkbox", "icon", "size">;

  /**
   * Controls how the group of checkboxs are arranged
   *
   * @default vertical
   */
  stack: "vertical" | "horizontal";

  /**
   * Informs the Checkbox Group & Checkbox that Show More is used.
   *
   * @default null
   */
  maxVisibleItems: number | null;
};

export type CheckboxGroupActions = {};

export type CheckboxGroupStateReturn = CheckboxGroupState &
  CheckboxGroupActions;

export type CheckboxGroupInitialState = Partial<
  Pick<CheckboxGroupState, "size" | "stack" | "maxVisibleItems">
>;

export function useCheckboxGroupState(
  props: CheckboxGroupInitialState = {},
): CheckboxGroupStateReturn {
  const { size = "md", stack = "vertical", maxVisibleItems = null } = props;

  return {
    size,
    stack,
    maxVisibleItems,
  };
}

const [CheckboxGroupContextProvider, useCheckboxGroupContext] =
  createContext<CheckboxGroupStateReturn>({
    name: "CheckboxGroupContextProvider",
    strict: false,
  });

export { CheckboxGroupContextProvider, useCheckboxGroupContext };