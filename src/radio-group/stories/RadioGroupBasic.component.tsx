import * as React from "react";

import { Radio, RadioGroup, RadioGroupProps } from "../../index";

export const RadioGroupBasic: React.FC<RadioGroupProps> = props => {
  return (
    <RadioGroup aria-label="fruits" {...props}>
      <Radio value="apple" label="Apple" />
      <Radio value="orange" label="Orange" />
      <Radio value="watermelon" label="Watermelon" />
      <Radio value="grapes" label="Grapes" />
      <Radio value="banana" label="Banana" />
      <Radio value="blueberry" label="Blueberry" />
      <Radio value="sapota" label="Sapota" />
      <Radio value="papaya" label="Papaya" />
      <Radio value="avocado" label="Avocado" />
      <Radio value="strawberry" label="Strawberry" />
      <Radio value="cherry" label="Cherry" />
      <Radio value="fig" label="Fig" />
      <Radio value="guava" label="Guava" />
      <Radio value="mango" label="Mango" />
    </RadioGroup>
  );
};

export default RadioGroupBasic;
