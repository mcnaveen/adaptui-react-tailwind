import {
  CheckboxState as RenderlesskitCheckboxState,
  CheckboxActions as RenderlesskitCheckboxActions,
  CheckboxInitialState as RenderlesskitCheckboxInitialState,
  useCheckboxState as useRenderlesskitCheckboxState,
} from "../checkboxReakit";
import { CheckboxInputOptions } from "./CheckboxInput";

export type CheckboxState = RenderlesskitCheckboxState & {
  /**
   * How large should the button be?
   *
   * @default md
   */
  size: keyof Renderlesskit.GetThemeValue<"checkboxNew", "icon", "size">;

  /**
   * If true, Checkbox is checked.
   */
  isChecked: boolean;

  /**
   * If true, Checkbox is indeterminate.
   */
  isIndeterminate: boolean;

  /**
   * If true, Checkbox is unchecked.
   */
  isUnchecked: boolean;

  /**
   * Input's value.
   */
  value: CheckboxInputOptions["value"];
};

export type CheckboxActions = RenderlesskitCheckboxActions & {};

export type CheckboxStateReturn = CheckboxState & CheckboxActions;

export type CheckboxInitialState = RenderlesskitCheckboxInitialState & {
  size?: CheckboxState["size"];
  value?: CheckboxInputOptions["value"];
};

export function useCheckboxState(
  props: CheckboxInitialState = {},
): CheckboxStateReturn {
  const { state, setState } = useRenderlesskitCheckboxState(props);
  const { size = "md", value } = props;

  const isChecked =
    Array.isArray(state) && value ? state.includes(value) : state === true;
  const isIndeterminate = state === "indeterminate";
  const isUnchecked = !isChecked && !isIndeterminate;

  return {
    state,
    setState,
    size,
    value,
    isChecked,
    isIndeterminate,
    isUnchecked,
  };
}
