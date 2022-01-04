import {
  createComponent,
  disclosureComposableButton,
  DisclosureHTMLProps,
  DisclosureOptions,
  Hook,
} from "@renderlesskit/react";

import { ButtonHTMLProps, ButtonOptions, useButton } from "../button";

export type ShowMoreButtonOptions = ButtonOptions & DisclosureOptions;

export type ShowMoreButtonHTMLProps = ButtonHTMLProps & DisclosureHTMLProps;

export type ShowMoreButtonProps = ShowMoreButtonOptions &
  ShowMoreButtonHTMLProps;

export const useShowMoreButton = disclosureComposableButton({
  name: "ShowMoreButton",
  compose: useButton,
}) as Hook<ShowMoreButtonOptions, ShowMoreButtonHTMLProps>;

export const ShowMoreButton = createComponent({
  as: "button",
  memo: true,
  useHook: useShowMoreButton,
});
console.log("%cShowMoreButton", "color: #ff6600", ShowMoreButton);
