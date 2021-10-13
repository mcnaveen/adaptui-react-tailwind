import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

import { createControls, createPreviewTabs } from "../../../.storybook/utils";

import js from "./templates/IconPathJsx";
import ts from "./templates/IconPathTsx";
import { IconPath } from "./IconPath.component";

type Meta = ComponentMeta<typeof IconPath>;
type Story = ComponentStoryObj<typeof IconPath>;

export default {
  title: "Primitives/Icons/Path",
  component: IconPath,
  argTypes: createControls("icon", {
    ignore: ["unstable_system", "wrapElement", "as"],
  }),
  parameters: {
    layout: "centered",
    options: { showPanel: true },
    preview: createPreviewTabs({ js, ts }),
  },
} as Meta;

export const Default: Story = {};
